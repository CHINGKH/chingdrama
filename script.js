const audioFile = document.getElementById('audioFile');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const processBtn = document.getElementById('processBtn');
const resultSection = document.getElementById('resultSection');
const outputResult = document.getElementById('outputResult');
const copyBtn = document.getElementById('copyBtn');
const targetLang = document.getElementById('targetLang');
const glossary = document.getElementById('glossary');

let selectedFile = null;

audioFile.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        selectedFile = e.target.files[0];
        fileNameDisplay.innerHTML = `បានជ្រើសរើស: <b>${selectedFile.name}</b>`;
    }
});

// បម្លែង File ទៅជា Base64
function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}

processBtn.addEventListener('click', async () => {
    if (!selectedFile) {
        alert('សូមជ្រើសរើសឯកសារសំឡេង ឬវីដេអូមុនសិន!');
        return;
    }

    resultSection.style.display = 'block';
    outputResult.innerHTML = `<div style="text-align: center; padding: 20px;"><i class="fa-solid fa-spinner fa-spin" style="font-size: 24px; color: #8b5cf6;"></i><p style="margin-top: 10px; color: #94a3b8;">កំពុងបញ្ជូន និងដំណើរការសំឡេងពិតជាមួយ Gemini AI...</p></div>`;

    try {
        const base64Audio = await convertFileToBase64(selectedFile);

        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                audioBase64: base64Audio,
                mimeType: selectedFile.type,
                targetLang: targetLang.value,
                glossary: glossary.value
            })
        });

        const data = await response.json();
        if (response.ok) {
            outputResult.textContent = data.result;
        } else {
            outputResult.textContent = `កំហុស៖ ${data.error}`;
        }
    } catch (err) {
        console.error(err);
        outputResult.textContent = 'មានបញ្ហាในการเชื่อมต่อជាមួយ Server!';
    }
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(outputResult.textContent);
    alert('បានចម្លងអត្ថបទរួចរាល់!');
});
