# Nura - Sistema e Ofertave

Një aplikacion Next.js për krijimin dhe menaxhimin e ofertave për produkte të dyerve dhe dritareve.

## 🚀 Karakteristikat

### ✨ Karakteristikat Kryesore

- **🏗️ Krijimi i Ofertave**: Krijimi i ofertave të detajuara me informacione të plota të produktit
- **💰 Sistemi i Çmimeve (Qmimi)**: Sistemi i plotë i çmimeve me kalkulime automatike
  - Çmimi për njësi (qmimi)
  - Sasia
  - Totali automatik për produkt
  - Totali i përgjithshëm i ofertës
- **📊 Dropdown të Shumëfishta**: Dropdown të avancuara që lejojnë zgjedhjen e shumë opsioneve
- **🎨 Template të Produkteve**: Template të paracaktuara për produktet më të përdorura
- **📱 UI Modern**: Ndërfaqe e përdoruesit moderne dhe responsive
- **📋 Shabllonet e Produkteve**: Template të gatshme me çmime dhe specifikime

### 🏷️ Kategoritë e Produkteve

1. **Derë e mbrendshme** - €350.00
2. **Derë e Hyrjes** - €650.00  
3. **Derë e Garazhës** - €850.00
4. **Derë e mbrendshme MDF** - €280.00

### 🔧 Opsionet e Produkteve

Aplikacioni ofron një gamë të gjerë opsionesh për çdo produkt:

#### **Tipi i Produktit**
- me elektomotor, me shirk-litar, Antrazit, Golden Oak
- Profili, Alumin, Alumin Termo, GEALAN S9000 German profiles
- MDF 40mm+6mm

#### **Specifikime Teknike**
- **Hapja Roletneteve**: Bardh, Antrazit-Bardh, Antrazit, Golden Oak, Spas doelloss
- **Ngjyra e Roletneteve**: Bardh, Antrazit-Bardh, Antrazit, Golden Oak, AGB, Cilinder, Çeles-Magnet
- **Fletëzat e Roletneteve**: Bardh, Antrazit-Bardh, Antrazit, Golden Oak, GEALAN S9000 German profiles
- **Profili**: Alumin, Alumin-Panel, MDF
- **Ngjyra e Profilit**: Bardh, Antrazit-Bardh, Antrazit, Golden Oak, Sigjenja, PSK SISTEM, HS SISTEM
- **Mekanizmat**: Sigjenja, PSK SISTEM, HS SISTEM, Hoppe, PSK Panel, Sendvic Panel 40 mm, AGB
- **Dorzat**: Hoppe, Pvc GEALAN S9000, Pvc Panel, Cilinder, Çeles-Magnet
- **Mbushja**: Pvc Panel, Sendvic Panel 40 mm, MDF
- **Llavjet e Braves**: Lloji i braves, Mbyllja e braves, 2 cope
- **Mekanizmat e Braves**: Mekanizmat i braves, Pvc Panel zbukurues, Sendvic Panel 40 mm, Cilinder: Magnet
- **Qelsat**: Qelsat, 3 cope, 2 cope, 3D
- **Bagjlamat**: Marc, Stubina, Me 3 mbyllje, Të koduar 5 Cope, Telekomanda, Të bllokuara, Të doellossa 3D

### 🎯 Dropdown të Shumëfishta

- **Zgjedhje të Shumta**: Mundësia për të zgjedhur shumë opsione nga lista
- **Vlera të Personalizuara**: Shtoni vlera të reja që nuk janë në listë
- **Chip UI**: Shfaqja e zgjedhjeve si chip-a që mund të hiqen lehtë
- **Kontrolle Intuitive**: Interface e thjeshtë për menaxhimin e zgjedhjeve

### 💳 Sistemi i Çmimeve

- **Qmimi (€)**: Çmimi për njësi në Euro
- **Sasia**: Numri i njësive
- **Totali Automatik**: Kalkulohet automatikisht (Qmimi × Sasia)
- **Totali i Përgjithshëm**: Shuma e të gjithë produkteve
- **Statistika të Shpejta**: Vështrimi i statistikave në kohë reale

### 📊 Statistikat dhe Analizat

- **Numri i Produkteve**: Sa produkte ka në ofertë
- **Totali**: Vlera totale e ofertës
- **Mesatarja**: Çmimi mesatar për produkt
- **Artikujt**: Numri total i artikujve (sasia)

### 📄 Gjenerimi i PDF-së

- **PDF Profesional**: Gjeneron PDF të formatuara profesionalisht
- **Detajet e Produkteve**: Përfshin të gjitha specifikacionet
- **Informatat e Çmimeve**: Shfaq çmimet, sasitë dhe totalet
- **Logo dhe Brandim**: Përfshin logon dhe informatat e kompanisë
- **Tabela e Çmimeve**: Përmbledhje e detajuar e çmimeve

### 💾 Ruajtja dhe Eksportimi

- **Ruajtje Lokale**: Ruajtja në localStorage të browser-it
- **Eksport JSON**: Eksportimi i të dhënave si JSON
- **PDF Download**: Shkarkimi i ofertës si PDF
- **Backup dhe Restore**: Mundësia për backup dhe restaurim

### 🖼️ Menaxhimi i Imazheve

- **Upload i Imazheve**: Ngarkimi i imazheve për çdo produkt
- **Preview**: Shikimi paraprak i imazheve
- **Kompresimi**: Kompresimi automatik për PDF
- **Formatet e Mbështetura**: JPG, PNG, WebP

## 🛠️ Teknologjitë e Përdorura

- **Next.js 15**: Framework React me App Router
- **TypeScript**: Type safety dhe developer experience
- **Tailwind CSS**: Styling modern dhe responsive
- **jsPDF**: Gjenerimi i PDF-ve
- **LocalStorage**: Ruajtja lokale e të dhënave
- **HTML5 File API**: Ngarkimi i imazheve

## 🚀 Instalimi dhe Përdorimi

### Instalimi

```bash
npm install
```

### Zhvillimi

```bash
npm run dev
```

Hapni [http://localhost:3000](http://localhost:3000) në browser.

### Build për Prodhim

```bash
npm run build
npm start
```

## 📋 Si të Përdorni

1. **Krijoni Ofertë të Re**:
   - Shkruani të dhënat e klientit
   - Zgjidhni template ose krijoni produkt nga e para
   - Përdorni dropdown të shumëfishta për specifikime të detajuara

2. **Shtoni Çmime**:
   - Shkruani çmimin për njësi në fushën "Qmimi (€)"
   - Përcaktoni sasinë
   - Totali kalkulohet automatikisht

3. **Përdorni Template**:
   - Klikoni në një nga template të paracaktuara
   - Modifikoni sipas nevojës
   - Shtoni ose hiqni specifikime

4. **Eksportoni Ofertën**:
   - "Ruaj ofertën" - për ruajtje lokale
   - "Shkarko PDF" - për PDF profesional
   - "Exporto JSON" - për backup të dhënash

## 🎨 Karakteristikat e UI

- **Design Modern**: Interface e pastër dhe moderne
- **Responsive**: Funksionon në desktop, tablet dhe mobile
- **Aksesibilitet**: E aksesueshme për të gjithë përdoruesit
- **Performance**: Optimizuar për performancë të shkëlqyer
- **Animacione**: Transicione dhe animacione të buta

## 📊 Analiza e Të Dhënave

Aplikacioni ofron analiza të detajuara:
- Statistika të shpejta në krye të formës
- Përmbledhje çmimesh për çdo produkt
- Totali i përgjithshëm me breakdown
- Analizë e sasive dhe mesatareve

## 🔮 Karakteristika të Ardhshme

- [ ] Integrim me sistem inventory
- [ ] Email automation për dërgimin e ofertave
- [ ] Templating engine i avancuar
- [ ] Analiza të avancuara dhe raporte
- [ ] Multi-language support
- [ ] Integrim me sistem CRM

## 🤝 Kontributi

Kontributet janë të mirëpritura! Ju lutemi hapni një issue ose dërgoni një pull request.

## 📝 Licensa

MIT License - shihni [LICENSE](LICENSE) për detaje.

---

**Zhvilluar me ❤️ për Nura DOO**
