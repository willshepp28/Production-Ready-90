"""Authentication API endpoints."""
from flask import request, jsonify
from app.api import api_bp
from app.models.user import User


@api_bp.route('/auth/login', methods=['POST'])
def login():
    """Authenticate user with username/email and password.

    Request Body:
        username (str): Username or email
        password (str): Password

    Returns:
        JSON response with user data or error message
    """
    data = request.get_json()

    if not data.get('username') or not data.get('password'):
        return jsonify({'error': 'Username and password are required'}), 400

    # Find user by username or email
    user = User.query.filter(
        (User.username == data['username']) | (User.email == data['username'])
    ).first()

    if not user or not user.check_password(data['password']):
        return jsonify({'error': 'Invalid credentials'}), 401

    if not user.is_active:
        return jsonify({'error': 'User account is inactive'}), 403

    return jsonify({
        'message': 'Login successful',
        'user': user.to_dict(include_email=True)
    }), 200


@api_bp.route('/auth/register', methods=['POST'])
def register():
    """Register a new user account.

    Request Body:
        username (str): Username (required)
        email (str): Email address (required)
        password (str): Password (required)
        first_name (str): First name (optional)
        last_name (str): Last name (optional)

    Returns:
        JSON response with created user data
    """
    # This endpoint delegates to the create_user endpoint
    from app.api.users import create_user
    return create_user()
