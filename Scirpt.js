// Mevcut Bakiye Değişkeni
let currentBalance = 15450.00;

const balanceDisplay = document.getElementById('balance-amount');
const transferForm = document.getElementById('transfer-form');
const transactionList = document.getElementById('transaction-list');
const messageBox = document.getElementById('message');

// Bakiyeyi Ekrana Formatlı Yazdırma Fonksiyonu
function updateBalanceDisplay() {
    balanceDisplay.textContent = `${currentBalance.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺`;
}

// Form Gönderildiğinde Çalışacak Kod
transferForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const iban = document.getElementById('iban').value;
    const receiver = document.getElementById('receiver').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Bakiye Kontrolü
    if (amount > currentBalance) {
        showMessage("Yetersiz bakiye! İşlem gerçekleştirilemedi.", "error");
        return;
    }

    // Bakiyeden Düş
    currentBalance -= amount;
    updateBalanceDisplay();

    // İşlem Geçmişine Ekle
    addTransactionToHistory(receiver, amount);

    // Başarı Mesajı Göster
    showMessage(`${amount.toLocaleString('tr-TR')} ₺ tutarındaki transfer ${receiver} kişisine başarıyla gönderildi.`, "success");

    // Formu Temizle
    transferForm.reset();
});

// Geçmişe Yeni İşlem Ekleme Fonksiyonu
function addTransactionToHistory(receiver, amount) {
    const li = document.createElement('li');
    li.className = 'transaction-item expense';
    li.innerHTML = `
        <span>Transfer: ${receiver}</span>
        <span class="amount">-${amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺</span>
    `;
    
    // En üste ekle
    transactionList.insertBefore(li, transactionList.firstChild);
}

// Bildirim Mesajı Gösterme
function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = `message ${type}`;
    
    setTimeout(() => {
        messageBox.className = 'message';
    }, 4000);
}

// Çıkış Butonu Simülasyonu
document.getElementById('logout-btn').addEventListener('click', function() {
    alert("Oturum kapatıldı. (Demo)");
});
