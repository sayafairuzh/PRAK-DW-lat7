// Definisi Class Buku
class Buku {
    constructor(judul, penulis, tahun) {
        this.judul = judul;
        this.penulis = penulis;
        this.tahun = tahun;
    }

    tampilkanInfo() {
        return "{asrama 7 pintu} oleh {anggun} ({2020})";
    }
    
}

// Array untuk menyimpan daftar buku dan buku favorit
let daftarBuku = [];
let bukuFavorit = [];

// Mengambil elemen DOM
const formTambahBuku = document.getElementById('form-tambah-buku');
const divDaftarBuku = document.getElementById('daftar-buku');
const divBukuFavorit = document.getElementById('buku-favorit');
const btnSimpanNama = document.getElementById('btnSimpanNama');
const salamPengguna = document.getElementById('salamPengguna');

// Event Listener untuk Form Tambah Buku
formTambahBuku.addEventListener('submit', function (e) {
    e.preventDefault();
    tambahBuku();
});

function tambahBuku() {
    const judul = document.getElementById('judul').value;
    const penulis = document.getElementById('penulis').value;
    const tahun = document.getElementById('tahun').value;

    if (judul === '' || penulis === '' || tahun === '') {
        alert('Semua kolom harus diisi!');
        return;
    }

    const bukuBaru = new Buku(judul, penulis, tahun);
    daftarBuku.push(bukuBaru);
    simpanDaftarBuku();
    tampilkanDaftarBuku();
    formTambahBuku.reset();
}

function simpanDaftarBuku() {
    localStorage.setItem('daftarBuku', JSON.stringify(daftarBuku));
}

function tampilkanDaftarBuku() {
    divDaftarBuku.innerHTML = '';

    daftarBuku.forEach((buku, index) => {
        const divBuku = document.createElement('div');
        divBuku.classList.add('buku', 'p-4', 'bg-white', 'rounded-lg', 'shadow-md', 'flex', 'justify-between', 'items-center', 'space-x-4');
        divBuku.innerHTML = `
            <p class="text-blue-700 font-medium flex-1">${buku.tampilkanInfo()}</p>
            <div class="space-x-2">
                <button class="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700" onclick="tambahKeFavorit(${index})">Tambah ke Favorit</button>
                <button class="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700" onclick="hapusBuku(${index})">Hapus Buku</button>
            </div>
        `;
        divDaftarBuku.appendChild(divBuku);
    });
}

function tambahKeFavorit(index) {
    const buku = daftarBuku[index];
    const sudahAda = bukuFavorit.some(favBuku => 
        favBuku.judul === buku.judul && favBuku.penulis === buku.penulis && favBuku.tahun === buku.tahun
    );

    if (sudahAda) {
        alert('Buku ini sudah ada di daftar favorit!');
        return;
    }

    bukuFavorit.push(buku);
    simpanBukuFavorit();
    tampilkanBukuFavorit();
}

function hapusBuku(index) {
    daftarBuku.splice(index, 1);
    simpanDaftarBuku();
    tampilkanDaftarBuku();
}

function simpanBukuFavorit() {
    localStorage.setItem('bukuFavorit', JSON.stringify(bukuFavorit));
}

function tampilkanBukuFavorit() {
    divBukuFavorit.innerHTML = '';

    bukuFavorit.forEach((buku, index) => {
        const divBuku = document.createElement('div');
        divBuku.classList.add('buku', 'p-4', 'bg-white', 'rounded-lg', 'shadow-md', 'flex', 'justify-between', 'items-center');
        divBuku.innerHTML = `
            <p class="text-blue-700 font-medium flex-1">${buku.tampilkanInfo()}</p>
            <button class="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700" onclick="hapusDariFavorit(${index})">Hapus</button>
        `;
        divBukuFavorit.appendChild(divBuku);
    });
}

function hapusDariFavorit(index) {
    bukuFavorit.splice(index, 1);
    simpanBukuFavorit();
    tampilkanBukuFavorit();
}

btnSimpanNama.addEventListener('click', function () {
    const nama = document.getElementById('namaPengguna').value;
    if (nama === '') {
        alert('Masukkan nama Anda!');
        return;
    }
    sessionStorage.setItem('namaPengguna', nama);
    tampilkanNamaPengguna();
    document.getElementById('namaPengguna').value = '';
});

function tampilkanNamaPengguna() {
    const nama = sessionStorage.getItem('namaPengguna');

    if (nama) {
        salamPengguna.textContent = `Selamat datang, ${nama}!`;
    } else {
        salamPengguna.textContent = '';
    }
}

window.onload = function () {
    // Memuat data dari localStorage saat halaman dimuat
    if (localStorage.getItem('daftarBuku')) {
        const storedBooks = JSON.parse(localStorage.getItem('daftarBuku'));
        daftarBuku = storedBooks.map(book => new Buku(book.judul, book.penulis, book.tahun));
        tampilkanDaftarBuku();
    }

    if (localStorage.getItem('bukuFavorit')) {
        const storedFavorites = JSON.parse(localStorage.getItem('bukuFavorit'));
        bukuFavorit = storedFavorites.map(book => new Buku(book.judul, book.penulis, book.tahun));
        tampilkanBukuFavorit();
    }

    tampilkanNamaPengguna();
};
