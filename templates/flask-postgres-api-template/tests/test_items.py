"""Tests for item endpoints."""
import json


def test_get_items(client, sample_item):
    """Test getting all items."""
    response = client.get('/api/v1/items')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'items' in data
    assert len(data['items']) > 0


def test_get_item(client, sample_item):
    """Test getting a specific item."""
    response = client.get(f'/api/v1/items/{sample_item.id}')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['name'] == 'Test Item'


def test_create_item(client, sample_user):
    """Test creating a new item."""
    item_data = {
        'name': 'New Item',
        'description': 'New description',
        'price': 49.99,
        'quantity': 5,
        'user_id': sample_user.id
    }
    response = client.post(
        '/api/v1/items',
        data=json.dumps(item_data),
        content_type='application/json'
    )
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['name'] == 'New Item'
    assert data['price'] == 49.99


def test_update_item(client, sample_item):
    """Test updating an item."""
    update_data = {
        'name': 'Updated Item',
        'price': 199.99
    }
    response = client.put(
        f'/api/v1/items/{sample_item.id}',
        data=json.dumps(update_data),
        content_type='application/json'
    )
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['name'] == 'Updated Item'
    assert data['price'] == 199.99


def test_delete_item(client, sample_item):
    """Test deleting an item."""
    response = client.delete(f'/api/v1/items/{sample_item.id}')
    assert response.status_code == 200

    # Verify item is deleted
    get_response = client.get(f'/api/v1/items/{sample_item.id}')
    assert get_response.status_code == 404


def test_get_items_by_user(client, sample_user, sample_item):
    """Test filtering items by user."""
    response = client.get(f'/api/v1/items?user_id={sample_user.id}')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data['items']) > 0
    assert all(item['user_id'] == sample_user.id for item in data['items'])


def test_pagination(client, sample_user):
    """Test pagination for items."""
    # Create multiple items
    for i in range(5):
        item_data = {
            'name': f'Item {i}',
            'user_id': sample_user.id
        }
        client.post(
            '/api/v1/items',
            data=json.dumps(item_data),
            content_type='application/json'
        )

    response = client.get('/api/v1/items?page=1&per_page=2')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data['items']) == 2
    assert data['total'] >= 5
