from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.hashers import make_password
from rest_framework.test import APIClient
from rest_framework import status
from .models import UniUser, Department

class UniUserTestCase(TestCase):
    def setUp(self):
        self.department = Department.objects.create(
            major_name="Computer Science",
            dept_head="Dr. Smith",
            dept_contact="555-1234",
            dept_location="Engineering Building",
            dept_identifier="CS",
            course_id="C101"
        )
        # Create a test user with a hashed password.
        self.user = UniUser.objects.create(
            username="jdoe",
            first_name="John",
            last_name="Doe",
            email="jdoe@university.edu",
            password=make_password("testpassword"),  # Hash the raw password "testpassword"
            department=self.department
        )
    
    def test_insert_and_retrieve_user(self):
        """Test that a user can be created and retrieved."""
        user = UniUser.objects.get(username="jdoe")
        self.assertEqual(user.first_name, "John")
        self.assertEqual(user.email, "jdoe@university.edu")
    
    def test_api_create_user(self):
        """Test the create-user endpoint via API call."""
        client = APIClient()
        payload = {
            "username": "asmith",
            "password": "newpassword",
            "first_name": "Alice",
            "last_name": "Smith",
            "email": "asmith@university.edu"
        }
        # Assume your router registered the viewset with basename "uniuser",
        # so the URL name is 'uniuser-list'
        url = reverse('uniuser-list')  # Adjust the name if needed.
        response = client.post(url, payload, format='json')
        # Expect a 201 Created response
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        new_user = UniUser.objects.get(username="asmith")
        self.assertEqual(new_user.first_name, "Alice")
        self.assertEqual(new_user.email, "asmith@university.edu")
    
    def test_api_login(self):
        """Test the login endpoint via API call."""
        client = APIClient()
        # Assume you have registered your LoginView with the URL name 'login'
        url = reverse('login')  # Make sure your urls.py names the login endpoint accordingly.
        login_payload = {
            "username": "jdoe",
            "password": "testpassword"  # This is the raw password
        }
        response = client.post(url, login_payload, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("message", response.data)
        self.assertEqual(response.data["message"], "Login successful")