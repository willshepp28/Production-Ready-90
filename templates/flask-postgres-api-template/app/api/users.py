"""User API endpoints."""
from flask import request, jsonify
from app.api import api_bp
from app.models.user import User
from app import db
from sqlalchemy.exc import IntegrityError


@api_bp.route('/users', methods=['GET'])
def get_users():
    """Get all users with pagination.

    Query Parameters:
        page (int): Page number (default: 1)
        per_page (int): Items per page (default: 20, max: 100)

    Returns:
        JSON response with users list and pagination info
    """
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 20, type=int), 100)

    pagination = User.query.filter_by(is_active=True).paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    users = [user.to_dict() for user in pagination.items]

    return jsonify({
        'users': users,
        'total': pagination.total,
        'page': page,
        'per_page': per_page,
        'pages': pagination.pages
    }), 200


@api_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    """Get a specific user by ID.

    Args:
        user_id (int): User ID

    Returns:
        JSON response with user data
    """
    user = User.query.get_or_404(user_id)
    return jsonify(user.to_dict(include_email=True)), 200


@api_bp.route('/users', methods=['POST'])
def create_user():
    """Create a new user.

    Request Body:
        username (str): Username (required)
        email (str): Email address (required)
        password (str): Password (required)
        first_name (str): First name (optional)
        last_name (str): Last name (optional)

    Returns:
        JSON response with created user data
    """
    data = request.get_json()

    # Validate required fields
    required_fields = ['username', 'email', 'password']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400

    # Create new user
    user = User(
        username=data['username'],
        email=data['email'],
        first_name=data.get('first_name'),
        last_name=data.get('last_name')
    )
    user.set_password(data['password'])

    try:
        db.session.add(user)
        db.session.commit()
        return jsonify(user.to_dict(include_email=True)), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Username or email already exists'}), 409


@api_bp.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    """Update an existing user.

    Args:
        user_id (int): User ID

    Request Body:
        email (str): Email address (optional)
        first_name (str): First name (optional)
        last_name (str): Last name (optional)
        password (str): New password (optional)

    Returns:
        JSON response with updated user data
    """
    user = User.query.get_or_404(user_id)
    data = request.get_json()

    # Update allowed fields
    if 'email' in data:
        user.email = data['email']
    if 'first_name' in data:
        user.first_name = data['first_name']
    if 'last_name' in data:
        user.last_name = data['last_name']
    if 'password' in data:
        user.set_password(data['password'])

    try:
        db.session.commit()
        return jsonify(user.to_dict(include_email=True)), 200
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Email already exists'}), 409


@api_bp.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    """Soft delete a user by marking them as inactive.

    Args:
        user_id (int): User ID

    Returns:
        JSON response with success message
    """
    user = User.query.get_or_404(user_id)
    user.is_active = False
    db.session.commit()

    return jsonify({'message': 'User deleted successfully'}), 200
