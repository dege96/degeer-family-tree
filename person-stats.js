const mammasSida = document.querySelector('.Mammas_sida');
const pappasSida = document.querySelector('.Pappas_sida');
mammasSida.classList.add('hidden');
pappasSida.classList.remove('hidden');


const personData = {
    'Daniel De Geer': {
        birthYear: 1992,
        relation: 'Du',
        percentage: 100,
        occupation: 'Ingenjör',
        history: 'Daniel De Geer, född den 6 december 1992, är en svensk kille mest känd för sin släktskap till Victor De Geer, också världskänd för sin roll som Håkan Bråkan i filmen Sune och hans värld och Grodmysteriet. Barnbarns barnbarns barnbarns barnbarns barnbarn till Louis De Geer',
        link: 'https://www.imdb.com/name/nm6150276/'
    },
    'Johan De Geer': {
        birthYear: 1962,
        relation: 'Far',
        percentage: 50,
        occupation: 'Entreprenöriell ingenjör',
        history: 'Johan De Geer är en innovativ och entreprenöriell medlem av familjen och är känd för att alltid förlora i sällskapsspel.',
        link: 'https://sv.wikipedia.org/wiki/Johan_De_Geer'
    },
    'Marianne De Geer': {
        birthYear: 1937,
        relation: 'Farmor',
        percentage: 25,
        history: 'Marianne De Geer, dotter till Jan-Carl Louis Alexander Vilhelmsson De Geer, växte upp i en period av ekonomisk förändring i Sverige och var en del av den svenska adeln under 1900-talet.',
        link: 'https://sv.wikipedia.org/wiki/Marianne_De_Geer'
    },
    'Jan-Carl Louis De Geer': {
        birthYear: 1905,
        relation: 'Farmors far',
        percentage: 12.5,
        occupation: '',
        history: 'Jan-Carl Louis Alexander Vilhelmsson De Geer.',
        link: 'https://sv.wikipedia.org/wiki/Jan-Carl_Louis_Alexander_Vilhelmsson_De_Geer'
    },
    'Emil Wilhelm Philip De Geer': {
        birthYear: 1871,
        relation: 'Farmors farfar',
        percentage: 6.25,
        occupation: 'Befälhavare',
        history: 'Emil De Geer var en Major. Befälhavare från Norrköping östra rullförsoningsområrde nr 26 i Norrköping. Ordförande för Norrköpings skyttegille.',
        link: 'https://sv.wikipedia.org/wiki/Emil_Vilhelm_Filip_De_Geer'
    },
    'Carl Wilhelm Alexander Ludvig De Geer': {
        birthYear: 1836,
        relation: 'Farmors farfars far',
        percentage: 3.125,
        occupation: 'Underlöjtnant',
        history: 'Carl Wilhelm Alexander Ludvig De Geer. Underlöjtnant vid Andra livgrenadjärregementet I 5.',
        link: 'https://sv.wikipedia.org/wiki/Carl_Wilhelm_Alexander_Ludvig_De_Geer'
    },
    'Fredrik Wilhelm De Geer': {
        birthYear: 1796,
        relation: 'Farmors farfars farfar',
        percentage: 1.5625,
        occupation: 'Major',
        history: 'Fredrik Wilhelm De Geer.',
        link: 'https://sv.wikipedia.org/wiki/Fredrik_Wilhelm_De_Geer'
    },
    'Alexander De Geer': {
        birthYear: 1744,
        relation: 'Farmors farfars farfars far',
        percentage: 0.78125,
        occupation: 'Sergant',
        history: 'Alexander föddes 12 juni 1744 på Godegård. Kapten. Gift 6 oktober 1785 med Ulrika Elisabet Wolffelt. Paret fick barnen: - Althea Maria f.1786-10-08 på Skälboö - Lovisa Ulrika - Fredrik Vilhelm f.1796-08-20 på Skälboö - Carolina Sofia',
        link: 'https://sv.wikipedia.org/wiki/Alexander_De_Geer'
    },
    'Johan Carl De Geer': {
        birthYear: 1706,
        relation: 'Farmors farfars farfars farfar',
        percentage: 0.390625,
        occupation: 'Brukspatron',
        history: 'Johan Carl De Geer. ',
        link: 'https://sv.wikipedia.org/wiki/Johan_Carl_De_Geer'
    },
    'Jean De Geer Jr': {
        birthYear: 1674,
        relation: 'Farmors farfars(x3) far',
        percentage: 0.1953125,
        occupation: 'Brukspatron',
        history: '',
        link: 'https://sv.wikipedia.org/wiki/Jean_De_Geer_(1675%E2%80%931740)'
    },
    'Jean De Geer': {
        birthYear: 1632,
        relation: 'Farmors farfars(x3) farfar',
        percentage: 0.0976563,
        occupation: 'Brukspatron',
        history: 'Jean De Geer var son till Louis De Geer och en central figur i den tidiga svenska adeln. Han var också involverad i industriell utveckling och hade stor påverkan på Sveriges ekonomiska tillväxt under 1600-talet.',
        link: 'https://sv.wikipedia.org/wiki/Jean_De_Geer_(1632%E2%80%931696)'
    },
    'Louis De Geer': {
        birthYear: 1587,
        relation: 'Farmors farfars(x4) far',
        percentage: 0.0488281,
        occupation: 'Industriell fader',
        history: 'Louis De Geer är din anfader tolv generationer tillbaka. Louis De Geer var en framstående svensk adelsman och affärsman, som anses vara en av grundarna av Sveriges industriliv. Han var även politiskt aktiv och en av de första som investerade i den svenska järnindustrin. Hans ättlingar har haft en betydande påverkan på svensk historia.',
        link: 'https://sv.wikipedia.org/wiki/Louis_De_Geer'
    }
    
};

document.addEventListener('DOMContentLoaded', function() {
    // Befintlig kod för person-klick events
    document.querySelectorAll('.tree a').forEach(person => {
        person.addEventListener('click', function(e) {
            e.preventDefault();

            // Hämta namnet på personen som klickats
            const name = this.textContent.trim().split('\n')[0];
            const nameWithYear = this.textContent.trim().split('\n')[1];
            
            if (nameWithYear === '1675)') {
                name = 'Jean De Geer Jr';
            }
            
            // Uppdatera statistik för både desktop och mobil
            updateStats(name);
            updateMobileStats(name);
            
            // Ta bort tidigare markering
            document.querySelector('.tree a.selected')?.classList.remove('selected');
            // Lägg till ny markering
            this.classList.add('selected');

            // Om på mobil, visa overlay och person-details
            if (window.innerWidth <= 768) {
                document.querySelector('.overlay')?.classList.add('active');
                document.querySelector('.person-details')?.classList.add('active');
            }
        });
    });

    // Lägg till stängfunktionalitet för mobil
    const closeButton = document.querySelector('.close-button');
    const overlay = document.querySelector('.overlay');

    if (closeButton) {
        closeButton.addEventListener('click', closeMobileDetails);
    }

    if (overlay) {
        overlay.addEventListener('click', closeMobileDetails);
    }
});

function updateStats(name) {
    const person = personData[name];
    if (!person) return;

    document.getElementById('person-name').textContent = name;
    document.getElementById('person-name').href = person.link;
    document.getElementById('birth-year').textContent = person.birthYear;
    document.getElementById('relation').textContent = person.relation;
    document.querySelector('.stat-fill').style.width = person.percentage + '%';
    document.querySelector('.stat-bar .stat-bar-value').textContent = person.percentage.toFixed(2) + '%';
    document.getElementById('person-history').textContent = person.history;
}

function updateMobileStats(name) {
    const person = personData[name];
    if (!person) return;

    const elements = {
        name: document.getElementById('mobile-person-name'),
        birthYear: document.getElementById('mobile-birth-year'),
        relation: document.getElementById('mobile-relation'),
        statFill: document.getElementById('mobile-stat-fill'),
        percentage: document.getElementById('mobile-percentage'),
        history: document.getElementById('mobile-person-history')
    };

    // Kontrollera att alla element finns innan vi uppdaterar dem
    if (elements.name) elements.name.textContent = name;
    if (elements.birthYear) elements.birthYear.textContent = person.birthYear;
    if (elements.relation) elements.relation.textContent = person.relation;
    if (elements.statFill) elements.statFill.style.width = person.percentage + '%';
    if (elements.percentage) elements.percentage.textContent = person.percentage.toFixed(2) + '%';
    if (elements.history) elements.history.textContent = person.history;
}

function closeMobileDetails() {
    document.querySelector('.overlay')?.classList.remove('active');
    document.querySelector('.person-details')?.classList.remove('active');
} 

document.getElementById('toggle').addEventListener('change', function() {
    if (this.checked) {
        mammasSida.classList.remove('hidden');
        pappasSida.classList.add('hidden');
    } else {
        mammasSida.classList.add('hidden');
        pappasSida.classList.remove('hidden');
    }
});