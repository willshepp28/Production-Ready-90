"""Tests for user endpoints."""
import json


def test_get_users(client, sample_user):
    """Test getting all users."""
    response = client.get('/api/v1/users')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'users' in data
    assert len(data['users']) > 0


def test_get_user(client, sample_user):
    """Test getting a specific user."""
    response = client.get(f'/api/v1/users/{sample_user.id}')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['username'] == 'testuser'
    assert data['email'] == 'test@example.com'


def test_create_user(client):
    """Test creating a new user."""
    user_data = {
        'username': 'newuser',
        'email': 'newuser@example.com',
        'password': 'password123',
        'first_name': 'New',
        'last_name': 'User'
    }
    response = client.post(
        '/api/v1/users',
        data=json.dumps(user_data),
        content_type='application/json'
    )
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['username'] == 'newuser'
    assert 'password' not in data


def test_update_user(client, sample_user):
    """Test updating a user."""
    update_data = {
        'first_name': 'Updated',
        'last_name': 'Name'
    }
    response = client.put(
        f'/api/v1/users/{sample_user.id}',
        data=json.dumps(update_data),
        content_type='application/json'
    )
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['first_name'] == 'Updated'
    assert data['last_name'] == 'Name'


def test_delete_user(client, sample_user):
    """Test deleting a user."""
    response = client.delete(f'/api/v1/users/{sample_user.id}')
    assert response.status_code == 200

    # Verify user is marked inactive
    get_response = client.get(f'/api/v1/users/{sample_user.id}')
    data = json.loads(get_response.data)
    assert data['is_active'] is False


def test_login_success(client, sample_user):
    """Test successful login."""
    login_data = {
        'username': 'testuser',
        'password': 'testpassword'
    }
    response = client.post(
        '/api/v1/auth/login',
        data=json.dumps(login_data),
        content_type='application/json'
    )
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'user' in data
    assert data['message'] == 'Login successful'


def test_login_invalid_credentials(client, sample_user):
    """Test login with invalid credentials."""
    login_data = {
        'username': 'testuser',
        'password': 'wrongpassword'
    }
    response = client.post(
        '/api/v1/auth/login',
        data=json.dumps(login_data),
        content_type='application/json'
    )
    assert response.status_code == 401
