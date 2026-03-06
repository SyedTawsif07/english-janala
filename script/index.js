const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all') // Promise of response
        .then(res => res.json())
        .then(data => displayLesson(data.data));
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWord(data.data))
}

// {
//     "id": 5,
//     "level": 1,
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার"
// }

const displayLevelWord = (words) => {
    console.log(words);
    // 1. get the container & empty;
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    // 2. go into every lessons
    words.forEach(word => {
        // 3. create element
        const wordDiv = document.createElement('div')
        wordDiv.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-semibold font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
        </div>
        `;
        // 4. append into container
        wordContainer.append(wordDiv);
    });
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

        <button onclick= "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>`;

        // 4. append into container
        levelContainer.append(btnDiv);
    }

}

loadLessons();