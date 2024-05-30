from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import DrivingSchool, Booking, Profile, Review, LessonResource

@login_required
def search_driving_schools(request):
    schools = DrivingSchool.objects.all()
    return render(request, 'search_driving_schools.html', {'schools': schools})

@login_required
def book_lesson(request, instructor_id):
    instructor = get_object_or_404(User, id=instructor_id, is_instructor=True)
    if request.method == 'POST':
        date = request.POST.get('date')
        Booking.objects.create(learner=request.user, instructor=instructor, date=date, status='Pending')
        return redirect('dashboard')
    return render(request, 'book_lesson.html', {'instructor': instructor})

@login_required
def manage_profile(request):
    profile, created = Profile.objects.get_or_create(user=request.user)
    if request.method == 'POST':
        profile.bio = request.POST.get('bio')
        profile.qualifications = request.POST.get('qualifications')
        profile.availability = request.POST.get('availability')
        profile.save()
        return redirect('dashboard')
    return render(request, 'manage_profile.html', {'profile': profile})

@login_required
def learning_resources(request):
    resources = LessonResource.objects.filter(instructor=request.user)
    return render(request, 'learning_resources.html', {'resources': resources})

@login_required
def community_reviews(request):
    reviews = Review.objects.all()
    return render(request, 'community_reviews.html', {'reviews': reviews})

