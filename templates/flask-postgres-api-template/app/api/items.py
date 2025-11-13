"""Item API endpoints."""
from flask import request, jsonify
from app.api import api_bp
from app.models.item import Item
from app.models.user import User
from app import db


@api_bp.route('/items', methods=['GET'])
def get_items():
    """Get all items with pagination and filtering.

    Query Parameters:
        page (int): Page number (default: 1)
        per_page (int): Items per page (default: 20, max: 100)
        user_id (int): Filter by user ID (optional)
        available (bool): Filter by availability (optional)

    Returns:
        JSON response with items list and pagination info
    """
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 20, type=int), 100)
    user_id = request.args.get('user_id', type=int)
    available = request.args.get('available', type=lambda v: v.lower() == 'true')

    # Build query
    query = Item.query

    if user_id:
        query = query.filter_by(user_id=user_id)
    if available is not None:
        query = query.filter_by(is_available=available)

    # Paginate results
    pagination = query.order_by(Item.created_at.desc()).paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    items = [item.to_dict() for item in pagination.items]

    return jsonify({
        'items': items,
        'total': pagination.total,
        'page': page,
        'per_page': per_page,
        'pages': pagination.pages
    }), 200


@api_bp.route('/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    """Get a specific item by ID.

    Args:
        item_id (int): Item ID

    Returns:
        JSON response with item data
    """
    item = Item.query.get_or_404(item_id)
    return jsonify(item.to_dict()), 200


@api_bp.route('/items', methods=['POST'])
def create_item():
    """Create a new item.

    Request Body:
        name (str): Item name (required)
        description (str): Item description (optional)
        price (float): Item price (optional)
        quantity (int): Item quantity (optional, default: 0)
        user_id (int): Owner user ID (required)

    Returns:
        JSON response with created item data
    """
    data = request.get_json()

    # Validate required fields
    if not data.get('name'):
        return jsonify({'error': 'name is required'}), 400
    if not data.get('user_id'):
        return jsonify({'error': 'user_id is required'}), 400

    # Verify user exists
    user = User.query.get(data['user_id'])
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Create new item
    item = Item(
        name=data['name'],
        description=data.get('description'),
        price=data.get('price'),
        quantity=data.get('quantity', 0),
        user_id=data['user_id']
    )

    db.session.add(item)
    db.session.commit()

    return jsonify(item.to_dict()), 201


@api_bp.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    """Update an existing item.

    Args:
        item_id (int): Item ID

    Request Body:
        name (str): Item name (optional)
        description (str): Item description (optional)
        price (float): Item price (optional)
        quantity (int): Item quantity (optional)
        is_available (bool): Availability status (optional)

    Returns:
        JSON response with updated item data
    """
    item = Item.query.get_or_404(item_id)
    data = request.get_json()

    # Update allowed fields
    if 'name' in data:
        item.name = data['name']
    if 'description' in data:
        item.description = data['description']
    if 'price' in data:
        item.price = data['price']
    if 'quantity' in data:
        item.quantity = data['quantity']
    if 'is_available' in data:
        item.is_available = data['is_available']

    db.session.commit()
    return jsonify(item.to_dict()), 200


@api_bp.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    """Delete an item.

    Args:
        item_id (int): Item ID

    Returns:
        JSON response with success message
    """
    item = Item.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()

    return jsonify({'message': 'Item deleted successfully'}), 200
