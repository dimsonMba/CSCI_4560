from django.db import models

# Table: UniversityData
class UniversityData(models.Model):
    student_id    = models.AutoField(primary_key=True)
    first_name    = models.CharField(max_length=50)
    last_name     = models.CharField(max_length=50)
    mtsu_email    = models.EmailField(max_length=100, unique=True)
    major         = models.CharField(max_length=100)
    grad_year     = models.IntegerField()
    enroll_status = models.CharField(
        max_length=20,
        choices=[('On Campus', 'On Campus'), ('Off Campus', 'Off Campus')]
    )

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
    user_id         = models.AutoField(primary_key=True)
    student_id = models.IntegerField("MTSU Number", unique=True, null=True, blank=True)
    username = models.CharField("Username", max_length=100, unique=True, null=True, blank=True)
    first_name      = models.CharField("First name", max_length=50, default='', blank=True)
    last_name       = models.CharField("Last name", max_length=50, default='', blank=True)
    personal_email  = models.EmailField("Personal Email", max_length=100, unique=True, default='', blank=True)
    mtsu_email      = models.EmailField("MTSU Email", max_length=100, unique=True, default='', blank=True)
    phone_number    = models.CharField("Phone Number", max_length=20, default='', blank=True)
    graduation_year = models.IntegerField("Graduation Year", default=0)
    major           = models.CharField("Major", max_length=100, default='', blank=True)
    password        = models.CharField("Password", max_length=128, default='', blank=True)

    class Meta:
        db_table = 'uni_users'

    def __str__(self):
        return f"{self.first_name} {self.last_name} (<{self.mtsu_email}>)"


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