function calculateAge() {
    const birthdate = document.getElementById('birthdate').value;
    const enddate = document.getElementById('enddate').value || new Date().toISOString().split('T')[0];

    if (!birthdate) {
        alert('Please Birth ate');
        return;
    }

    const birthDate = new Date(birthdate);
    const endDate = new Date(enddate);

    let ageYears = endDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = endDate.getMonth() - birthDate.getMonth();
    let ageDays = endDate.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    const totalMonths = ageYears * 12 + ageMonths;
    const totalDays = Math.floor((endDate - birthDate) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const nextBirthday = new Date(endDate.getFullYear() + (endDate > new Date(endDate.getFullYear(), birthDate.getMonth(), birthDate.getDate()) ? 1 : 0), birthDate.getMonth(), birthDate.getDate());
    const daysToNextBirthday = Math.floor((nextBirthday - endDate) / (1000 * 60 * 60 * 24));

    const zodiacSign = getZodiacSign(birthDate.getDate(), birthDate.getMonth() + 1);
    const zodiacIcon = getZodiacIcon(zodiacSign);

    document.getElementById('summary').innerHTML = `
        <div class="summary-info"><i class="fa fa-calendar-alt icon"></i>${ageYears} years - ${ageMonths} months - ${ageDays} days.</div>
    `;

    document.getElementById('detailed').innerHTML = `
        <div class="detailed-info">
            <i class="fa fa-calendar-alt"></i>
            <span>Total Months: ${totalMonths}</span>
        </div>
        <div class="detailed-info">
            <i class="fa fa-calendar-alt"></i>
            <span>Total Days: ${totalDays}</span>
        </div>
        <div class="detailed-info">
            <i class="fa fa-clock"></i>
            <span>Total Hours: ${totalHours}</span>
        </div>
        <div class="detailed-info">
            <i class="fa fa-birthday-cake"></i>
            <span>Next Birthday: ${nextBirthday.toDateString()}</span>
        </div>
        <div class="detailed-info">
            <i class="fa fa-hourglass-half"></i>
            <span>Days until Next Birthday: ${daysToNextBirthday}</span>
        </div>
        <div class="detailed-info zodiac-container">
            <i class="fa ${zodiacIcon} icon"></i>
            <span>Zodiac sign: ${zodiacSign}</span>
        </div>
    `;

    // Show the modal
    document.getElementById('ageModal').style.display = "block";
}

// Close the modal when the user clicks on <span> (x)
document.getElementsByClassName('close')[0].onclick = function() {
    document.getElementById('ageModal').style.display = "none";
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target == document.getElementById('ageModal')) {
        document.getElementById('ageModal').style.display = "none";
    }
}

function getZodiacSign(day, month) {
    const zodiacSigns = [
        "Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini", "Cancer",
        "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"
    ];
    const lastDayOfZodiacSign = [
        19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21
    ];
    if (day <= lastDayOfZodiacSign[month - 1]) {
        return zodiacSigns[month - 1];
    } else {
        return zodiacSigns[month % 12];
    }
}

function getZodiacIcon(zodiacSign) {
    const zodiacIcons = {
        "Capricorn": "fa-capricorn",
        "Aquarius": "fa-aquarius",
        "Pisces": "fa-pisces",
        "Aries": "fa-aries",
        "Taurus": "fa-taurus",
        "Gemini": "fa-gemini",
        "Cancer": "fa-cancer",
        "Leo": "fa-leo",
        "Virgo": "fa-virgo",
        "Libra": "fa-libra",
        "Scorpio": "fa-scorpio",
        "Sagittarius": "fa-sagittarius"
    };
    return zodiacIcons[zodiacSign] || "fa-star";
}