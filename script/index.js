const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all') // Promise of response
        .then(res => res.json())
        .then(data => displayLesson(data.data));
}


const displayLesson = (lessons) => {
    // 1. get the container & empty;
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = '';

    // 2. go into every lessons
    for (const lesson of lessons) {

        // 3. create element
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `

        <button class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>`;
        // 4. append into container
        levelContainer.append(btnDiv);
    }

}

loadLessons();