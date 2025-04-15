# Generated by Django 5.1.6 on 2025-04-15 18:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_student_email_student_first_name_student_last_name_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('department_id', models.AutoField(primary_key=True, serialize=False)),
                ('major_name', models.CharField(max_length=100)),
                ('dept_head', models.CharField(max_length=100)),
                ('dept_contact', models.CharField(max_length=20)),
                ('dept_location', models.CharField(max_length=100)),
                ('dept_identifier', models.CharField(max_length=20, unique=True)),
                ('course_id', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'departments',
            },
        ),
        migrations.CreateModel(
            name='UniversityData',
            fields=[
                ('student_id', models.AutoField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('major', models.CharField(max_length=100)),
                ('grad_year', models.IntegerField()),
                ('enroll_status', models.CharField(max_length=20)),
                ('course_id', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'university_data',
            },
        ),
        migrations.CreateModel(
            name='UniUser',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=100, unique=True)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('password', models.CharField(max_length=128)),
                ('department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.department')),
            ],
            options={
                'db_table': 'uni_users',
            },
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('privacy', models.CharField(choices=[('Public', 'Public'), ('Private', 'Private')], max_length=7)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.uniuser')),
            ],
            options={
                'db_table': 'posts',
            },
        ),
        migrations.DeleteModel(
            name='Student',
        ),
    ]
