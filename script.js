const audioFile = document.getElementById('audioFile');
const fileNameDisplay = document.getElementById('fileNameDisplay');
const processBtn = document.getElementById('processBtn');
const resultSection = document.getElementById('resultSection');
const outputResult = document.getElementById('outputResult');
const copyBtn = document.getElementById('copyBtn');

audioFile.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        fileNameDisplay.innerHTML = `បានជ្រើសរើស: <b>${e.target.files[0].name}</b>`;
    }
});

processBtn.addEventListener('click', async () => {
    const file = audioFile.files[0];
    if (!file) {
        alert('សូមជ្រើសរើសឯកសារសំឡេង ឬវីដេអូមុនសិន!');
        return;
    }

    resultSection.style.display = 'block';
    outputResult.innerHTML = `<div style="text-align: center; padding: 20px;"><i class="fa-solid fa-spinner fa-spin" style="font-size: 24px; color: #8b5cf6;"></i><p style="margin-top: 10px; color: #94a3b8;">កំពុងបញ្ជូនទៅកាន់ Gemini AI...</p></div>`;

    // จำลองการเรียก API (สามารถเชื่อมต่อกับ backend /api/translate បាន)
    setTimeout(() => {
        outputResult.innerHTML = 
`[00:01.200 --> 00:04.500] តើអ្នកដឹងទេថាពិភពលោកនេះទូលំទូលាយប៉ុណ្ណា?
[00:04.800 --> 00:08.100] រាល់ជំហានដែលយើងដើរគឺសុទ្ធតែមានអត្ថន័យ។`;
    }, 2500);
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(outputResult.textContent);
    alert('បានចម្លងអត្ថបទរួចរាល់!');
});
