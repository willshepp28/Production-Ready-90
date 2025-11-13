"""Pytest configuration and fixtures."""
import pytest
from app import create_app, db
from app.models import User, Item


@pytest.fixture
def app():
    """Create application for testing."""
    app = create_app('testing')

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    """Create test client."""
    return app.test_client()


@pytest.fixture
def runner(app):
    """Create test CLI runner."""
    return app.test_cli_runner()


@pytest.fixture
def sample_user(app):
    """Create a sample user for testing."""
    user = User(
        username='testuser',
        email='test@example.com',
        first_name='Test',
        last_name='User'
    )
    user.set_password('testpassword')
    db.session.add(user)
    db.session.commit()
    return user


@pytest.fixture
def sample_item(app, sample_user):
    """Create a sample item for testing."""
    item = Item(
        name='Test Item',
        description='Test description',
        price=99.99,
        quantity=10,
        user_id=sample_user.id
    )
    db.session.add(item)
    db.session.commit()
    return item
