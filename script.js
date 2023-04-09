
// Bu yöntemlerimizden biri ancak daha performanslı çalışan yöntemimiz var.
// fetch("https://sozluk.gov.tr/atasozu")
// .then(response => response.json())
// .then(veri => console.log(veri))



// Giriş ve çıkış için kullanacağımız HTML nesnelerini değişkenlere alalım.
const sonuc = document.getElementById("sonuc");
const aramaListesi = document.getElementById("aramaListesi");
const aramaKutusu = document.getElementById("aramaKutusu");


// JSON kaynağından aldığımız verileri sayfada tutmak için dizi değişkenleri oluşturalım.
const anahtarKelimeler = [];
const deyimlerSozler = [];


// Daha performanslı olan yöntem (Asenkron fonksiyon)
verileriYukle();

async function verileriYukle(){
    const response = await fetch("https://sozluk.gov.tr/atasozu"); // await sarı ışık anlamına gelir. Bekletmek için
    let veriler = await response.json();
    console.log(veriler);

    veriler.forEach(eleman => { 
        anahtarKelimeler.push(eleman.anahtar);
        deyimlerSozler.push(eleman.sozum);
    });
    //console.log("Anahtar kelimeler: ",anahtarKelimeler);


    // bazı kelimeler birden fazla tekrar ettiği için teke düşürelim
    const birlesmisKelimeler = [...new Set(anahtarKelimeler)];
    console.log("birlesmis kelimeler: ",birlesmisKelimeler);


    //Hep aynı önerileri vermesin diye diziyi karıştıralım.
    let sayac = 0;
    birlesmisKelimeler.sort(() => Math.random() - 0.5 );

    // Şimdi birlesmisKelimeleri öneri olarak alalım
    birlesmisKelimeler.forEach(kelime => {
        if(sayac < 5){ // 5 tane öneri versin diye if döngüsüne aldık
            const yeniOneri=document.createElement("option");
            aramaKutusu.appendChild(yeniOneri); 
            yeniOneri.value = kelime;
        }
        sayac++;
    })


    // inputun value'sini alalım
    aramaKutusu.addEventListener("input",(e) => sonuclariFiltrele(e.target.value));

    function sonuclariFiltrele(arananKelime){
        sonuc.innerHTML = "";
        const aramaKriteri = new RegExp(arananKelime,'gi');
        let eslesenler = deyimlerSozler.filter(soz => aramaKriteri.test(soz));

        //console.log(eslesenler);

        eslesenler.forEach(es => {
            const siradakiSonuc = document.createElement("li");
            sonuc.appendChild(siradakiSonuc);
            siradakiSonuc.innerHTML = es;
        })

    }



}

