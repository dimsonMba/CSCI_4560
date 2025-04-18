# Generated by Django 5.1.6 on 2025-04-17 18:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_department_universitydata_uniuser_post_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='universitydata',
            old_name='email',
            new_name='mtsu_email',
        ),
        migrations.RemoveField(
            model_name='uniuser',
            name='department',
        ),
        migrations.RemoveField(
            model_name='uniuser',
            name='email',
        ),
        migrations.RemoveField(
            model_name='uniuser',
            name='username',
        ),
        migrations.RemoveField(
            model_name='universitydata',
            name='course_id',
        ),
        migrations.AddField(
            model_name='uniuser',
            name='graduation_year',
            field=models.IntegerField(default=0, verbose_name='Graduation Year'),
        ),
        migrations.AddField(
            model_name='uniuser',
            name='major',
            field=models.CharField(blank=True, default='', max_length=100, verbose_name='Major'),
        ),
        migrations.AddField(
            model_name='uniuser',
            name='mtsu_email',
            field=models.EmailField(blank=True, default='', max_length=100, unique=True, verbose_name='MTSU Email'),
        ),
        migrations.AddField(
            model_name='uniuser',
            name='mtsu_number',
            field=models.CharField(blank=True, default='', max_length=20, unique=True, verbose_name='MTSU Number'),
        ),
        migrations.AddField(
            model_name='uniuser',
            name='personal_email',
            field=models.EmailField(blank=True, default='', max_length=100, unique=True, verbose_name='Personal Email'),
        ),
        migrations.AddField(
            model_name='uniuser',
            name='phone_number',
            field=models.CharField(blank=True, default='', max_length=20, verbose_name='Phone Number'),
        ),
        migrations.AlterField(
            model_name='uniuser',
            name='first_name',
            field=models.CharField(blank=True, default='', max_length=50, verbose_name='First name'),
        ),
        migrations.AlterField(
            model_name='uniuser',
            name='last_name',
            field=models.CharField(blank=True, default='', max_length=50, verbose_name='Last name'),
        ),
        migrations.AlterField(
            model_name='uniuser',
            name='password',
            field=models.CharField(blank=True, default='', max_length=128, verbose_name='Password'),
        ),
        migrations.AlterField(
            model_name='universitydata',
            name='enroll_status',
            field=models.CharField(choices=[('On Campus', 'On Campus'), ('Off Campus', 'Off Campus')], max_length=20),
        ),
    ]
