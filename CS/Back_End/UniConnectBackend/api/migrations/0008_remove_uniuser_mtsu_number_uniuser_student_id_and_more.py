# Generated by Django 5.1.6 on 2025-04-17 18:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_rename_email_universitydata_mtsu_email_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='uniuser',
            name='mtsu_number',
        ),
        migrations.AddField(
            model_name='uniuser',
            name='student_id',
            field=models.IntegerField(blank=True, null=True, unique=True, verbose_name='MTSU Number'),
        ),
        migrations.AddField(
            model_name='uniuser',
            name='username',
            field=models.CharField(blank=True, max_length=100, null=True, unique=True, verbose_name='Username'),
        ),
    ]
