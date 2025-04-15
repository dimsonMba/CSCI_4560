from django.db import models

# Table: UniversityData
class UniversityData(models.Model):
    student_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)
    major = models.CharField(max_length=100)
    grad_year = models.IntegerField()
    enroll_status = models.CharField(max_length=20)  # e.g., 'On Campus', 'Off Campus'
    course_id = models.CharField(max_length=20)

    class Meta:
        db_table = 'university_data'

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


# Table: Departments
class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    major_name = models.CharField(max_length=100)
    dept_head = models.CharField(max_length=100)
    dept_contact = models.CharField(max_length=20)
    dept_location = models.CharField(max_length=100)
    dept_identifier = models.CharField(max_length=20, unique=True)  # an extra field for uniqueness if needed
    course_id = models.CharField(max_length=20)

    class Meta:
        db_table = 'departments'

    def __str__(self):
        return self.major_name


# Table: UniUsers (custom user model mirroring your SQL Users table)
class UniUser(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=128)  # store a hashed password
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        db_table = 'uni_users'

    def __str__(self):
        return self.username


# Table: Posts
class Post(models.Model):
    id = models.AutoField(primary_key=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    privacy = models.CharField(
        max_length=7,
        choices=[('Public', 'Public'), ('Private', 'Private')]
    )
    # Associate each post with a user (a UniUser)
    user = models.ForeignKey(UniUser, on_delete=models.CASCADE)

    class Meta:
        db_table = 'posts'

    def __str__(self):
        return f"Post by {self.user.username} on {self.created_at}"