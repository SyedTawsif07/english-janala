const createElement = (arr) => {
    const htmlElement = arr.map(el => `<span class="btn bg-[#ffca1a10] hover:bg-[#ffca1a80]">${el}</span>`);
    return (htmlElement.join(' '));
}

const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }
    else {
        document.getElementById('word-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
}

const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all') // Promise of response
        .then(res => res.json())
        .then(data => displayLesson(data.data));
}

const removeActive = () => {
    const lessonButtons = document.querySelectorAll('.lesson-btn');
    // console.log(lessonButtons);
    lessonButtons.forEach(btn => btn.classList.remove('active'));
}

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();   // remove all active class
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add('active');  // add active class
            displayLevelWord(data.data);
        })
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }

const displayWordDetails = (word) => {
    console.log(word);
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
                <div class="">
                    <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> <span
                            class="font-bangla">:${word.pronunciation}</span>)</h2>
                    <p></p>
                </div>
                <div class="">
                    <h2 class="font-bold">Meaning</h2>
                    <p class="font-semibold font-bangla">${word.meaning}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Example</h2>
                    <p class="text-xl">${word.sentence}</p>
                </div>
                <div class="space-x-3">
                    <h2 class="font-bangla font-semibold mb-2">সমার্থক শব্দ গুলো</h2>
                    <div class="">${createElement(word.synonyms)}</div>
                </div>`;

    document.getElementById('word_modal').showModal();
}

// {
//     "id": 5,
//     "level": 1,
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার"
// }

const displayLevelWord = (words) => {
    // 1. get the container & empty;
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class=" text-center col-span-full space-y-6 py-10">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-xl text-gray-500 font-medium font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-bold font-bangla">নেক্সট Lesson এ যান</h2>
        </div>`;

        manageSpinner(false);
        return;
    }

    // 2. go into every lessons
    words.forEach(word => {
        // 3. create element
        const wordDiv = document.createElement('div');
        wordDiv.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-semibold font-bangla">
                "${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}"
            </div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
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
    manageSpinner(false);
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

        <button id="lesson-btn-${lesson.level_no}" onclick= "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>`;

        // 4. append into container
        levelContainer.append(btnDiv);
    }

}

// starts from here
loadLessons();

document.getElementById('btn-search').addEventListener('click', () => {
    removeActive();
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase()
    console.log(searchValue);

    fetch('https://openapi.programming-hero.com/api/words/all')
        .then(res => res.json())
        .then(data => {
            const allWords = data.data;
            // console.log(allWords);
            const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
            displayLevelWord(filterWords);
        })
})
