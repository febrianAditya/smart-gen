import { useState, useRef, useEffect } from "react";
import FooterComponent from "../components/FooterComponent"
import "./MainPage.css"
import * as XLSX from 'xlsx';
import * as PDFLib from "pdf-lib";
import { ToastContainer, toast, Slide  } from 'react-toastify';

export default function MainPage() {
    const [namePic, setNamePic] = useState("")
    const [nikPic, setNikPic] = useState("")
    const [positionPic, setPositionPic] = useState("")
    const [selectedNama, setSelectedNama] = useState("");
    const [hasilPDF, setHasilPDF] = useState({});
    const [dataList2, setDataList2] = useState([]);
    const [templateArrayBuffer, setTemplateArrayBuffer] = useState(null);
    const [signatureImage, setSignatureImage] = useState(null);
    const [loadingButton, setLoadingButton] = useState(false)

    const safe = (val) => (val === undefined || val === null || val === '') ? '-' : val;

    const iframeRef = useRef();

    useEffect(() => {
        // Load template PDF dari folder public
        fetch("/dataDummy.pdf")
          .then((res) => res.arrayBuffer())
          .then((buffer) => {
            setTemplateArrayBuffer(buffer);
          })
          .catch((err) => {
            console.error("Gagal memuat template PDF:", err);
            toast.error("Gagal memuat template PDF:", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
                
          });
    }, []);
    

    const options = [
        { label: 'Human Capital Personalia R1', value: 'Human Capital Personalia R1' },
        { label: 'Human Capital Personalia R2', value: 'Human Capital Personalia R2' },
        { label: 'Human Capital Personalia R3', value: 'Human Capital Personalia R3' },
        { label: 'Human Capital Personalia R4', value: 'Human Capital Personalia R4' },
        { label: 'Human Capital Personalia R5', value: 'Human Capital Personalia R5' },
        { label: 'Human Capital Personalia R6', value: 'Human Capital Personalia R6' },
        { label: 'Human Capital Personalia R7', value: 'Human Capital Personalia R7' },
        { label: 'Human Capital Personalia R8', value: 'Human Capital Personalia R8' },
        { label: 'Human Capital Personalia R9', value: 'Human Capital Personalia R9' },
        { label: 'Human Capital Personalia R10', value: 'Human Capital Personalia R10' },
        { label: 'Human Capital Personalia R11', value: 'Human Capital Personalia R11' },
        { label: 'Human Capital Personalia R12', value: 'Human Capital Personalia R12' },
        { label: 'Human Capital Personalia R13', value: 'Human Capital Personalia R13' },
        { label: 'Human Capital Personalia R14', value: 'Human Capital Personalia R14' },
        { label: 'Human Capital Personalia R15', value: 'Human Capital Personalia R15' },
        { label: 'Human Capital Personalia R16', value: 'Human Capital Personalia R16' },
        { label: 'Human Capital Personalia R17', value: 'Human Capital Personalia R17' },
        { label: 'Human Capital Personalia R18', value: 'Human Capital Personalia R18' },
        { label: 'Human Capital Personalia R19', value: 'Human Capital Personalia R19' },
        { label: 'Human Capital Personalia R20', value: 'Human Capital Personalia R20' },
        { label: 'Human Capital Personalia R21', value: 'Human Capital Personalia R21' },
        { label: 'Human Capital Personalia R22', value: 'Human Capital Personalia R22' },
        { label: 'Human Capital Personalia R23', value: 'Human Capital Personalia R23' },
        { label: 'Human Capital Personalia R24', value: 'Human Capital Personalia R24' },
        { label: 'Human Capital Personalia R25', value: 'Human Capital Personalia R25' },
        { label: 'Human Capital Personalia R26', value: 'Human Capital Personalia R26' },
        { label: 'Human Capital Personalia R27', value: 'Human Capital Personalia R27' },
    ];

    const handlePreviewChange = (e) => {
        setSelectedNama(e.target.value);
    };

    const handleExcelUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            toast.error('Silakan upload file Excel.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });
        } 
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(sheet);
          console.log(json, "==> FINAL");
          
          setDataList2(json);

          toast.success(`Berhasil memuat ${json.length} data dari Excel!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
            
        };
        reader.readAsArrayBuffer(file);
    };

    const generateAll = async () => {
        if (!namePic || !nikPic || !positionPic) {
            return toast.error('Mohon Isi Seluruh Detail PIC ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });    
        } 

        if (!templateArrayBuffer || !dataList2.length) {
            return toast.error('Silakan Upload Data Karyawan.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });    
        }
        const newHasilPDF = {};
    
        for (const data of dataList2) {
          const pdfDoc = await PDFLib.PDFDocument.load(templateArrayBuffer);
          const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
          const page = pdfDoc.getPages()[0];
    
          page.drawText(namePic, { x: 262, y: 598, size: 11, font });
          page.drawText(nikPic, { x: 262, y: 581, size: 11, font });
          page.drawText(positionPic, { x: 262, y: 565, size: 11, font });
    
          page.drawText(safe(data.NamaKaryawan), { x: 262, y: 471, size: 11, font });
          page.drawText(safe(data.NikKaryawan), { x: 262, y: 454, size: 11, font });
          page.drawText(safe(data.Jabatan), { x: 262, y: 438, size: 11, font });
    
          page.drawText(safe(data.NamaKaryawan), { x: 262, y: 345, size: 11, font });
          page.drawText(safe(data.NoJamkar), { x: 262, y: 328, size: 11, font });
          page.drawText(safe(data.JenisJamkar), { x: 262, y: 311, size: 11, font });

        if (data.TipeData == 1) {
            // CORET IJAZAH
            page.drawLine({
                start: { x: 134, y: 316 }, // sedikit di bawah tanda tangan
                end: { x: 134 + 20, y: 316 }, // panjang 2 cm (1 cm ≈ 28.35pt)
                thickness: 2,
                color: PDFLib.rgb(0, 0, 0), // hitam
            });

            page.drawLine({
                start: { x: 112, y: 332 }, // sedikit di bawah tanda tangan
                end: { x: 112 + 20, y: 332 }, // panjang 2 cm (1 cm ≈ 28.35pt)
                thickness: 2,
                color: PDFLib.rgb(0, 0, 0), // hitam
            });

            page.drawLine({
                start: { x: 156, y: 348 }, // sedikit di bawah tanda tangan
                end: { x: 156 + 20, y: 348 }, // panjang 2 cm (1 cm ≈ 28.35pt)
                thickness: 2,
                color: PDFLib.rgb(0, 0, 0), // hitam
            });

            page.drawLine({
                start: { x: 223, y: 380 }, // sedikit di bawah tanda tangan
                end: { x: 223 + 26, y: 380 }, // panjang 2 cm (1 cm ≈ 28.35pt)
                thickness: 2,
                color: PDFLib.rgb(0, 0, 0), // hitam
            });

            page.drawLine({
                start: { x: 250, y: 507 }, // sedikit di bawah tanda tangan
                end: { x: 250 + 26, y: 507 }, // panjang 2 cm (1 cm ≈ 28.35pt)
                thickness: 2,
                color: PDFLib.rgb(0, 0, 0), // hitam
            });
        }else if (data.TipeData == 2) {
            page.drawLine({
                start: { x: 165, y: 316 }, // sedikit di bawah tanda tangan
                end: { x: 165 + 20, y: 316 }, // panjang 2 cm (1 cm ≈ 28.35pt)
                thickness: 2,
                color: PDFLib.rgb(0, 0, 0), // hitam
            });

            page.drawLine({
                start: { x: 143, y: 332 }, // sedikit di bawah tanda tangan
                end: { x: 143 + 20, y: 332 }, // panjang 2 cm (1 cm ≈ 28.35pt)
                thickness: 2,
                color: PDFLib.rgb(0, 0, 0), // hitam
            });

            page.drawLine({
                start: { x: 187, y: 348 }, // sedikit di bawah tanda tangan
                end: { x: 187 + 20, y: 348 }, // panjang 2 cm (1 cm ≈ 28.35pt)
                thickness: 2,
                color: PDFLib.rgb(0, 0, 0), // hitam
            });

            page.drawLine({
                start: { x: 259, y: 380 }, // sedikit di bawah tanda tangan
                end: { x: 259 + 24, y: 380 }, // panjang 2 cm (1 cm ≈ 28.35pt)
                thickness: 2,
                color: PDFLib.rgb(0, 0, 0), // hitam
            });

            page.drawLine({
                start: { x: 288, y: 507 }, // sedikit di bawah tanda tangan
                end: { x: 288 + 24, y: 507 }, // panjang 2 cm (1 cm ≈ 28.35pt)
                thickness: 2,
                color: PDFLib.rgb(0, 0, 0), // hitam
            });
        }
          
        page.drawText(data.TanggalPengambilan, { x: 135, y: 630, size: 11, font });
    
          // Tanggal Jamkar
          page.drawText(safe(data.BulanPengambilan), { x: 71, y: 240, size: 11, font });


          page.drawText(safe(data.NamaKaryawan), { x: 396, y: 108, size: 11, font });
          page.drawText(safe(data.Jabatan), { x: 396, y: 93, size: 11, font });

          // Tanda Tangan
          page.drawText(namePic, { x: 72, y: 108, size: 11, font });

          if (signatureImage) {
            const signatureBytes = await fetch(signatureImage).then((res) => res.arrayBuffer());
            const signatureImageEmbed = await pdfDoc.embedPng(signatureBytes); // atau .embedJpg
            const signatureDims = signatureImageEmbed.scale(0.2); // Sesuaikan skala
          
            // Sisipkan tanda tangan di koordinat x, y
            page.drawImage(signatureImageEmbed, {
              x: 100, // Sesuaikan posisinya
              y: 140,
              width: signatureDims.width,
              height: signatureDims.height,
            });
          }
          
    
          const pdfBytes = await pdfDoc.save();
          const blob = new Blob([pdfBytes], { type: "application/pdf" });
          const blobUrl = URL.createObjectURL(blob);
          newHasilPDF[data.NamaKaryawan] = { blob, blobUrl };
        }
    
        setHasilPDF(newHasilPDF);



        toast.success("Semua PDF berhasil dibuat. Silakan pilih nama untuk preview.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
    };

    const handleSignatureUpload = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return toast.error("Silakan upload gambar tanda tangan.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
            });    
        }
      
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target.result; // base64 URL
          setSignatureImage(result);
          toast.success('Tanda tangan berhasil diupload.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
        });
            
        };
        reader.readAsDataURL(file); // base64 image
    };

    const sendToSpreadsheet = async (data) => {
        try {
            const url = import.meta.env.VITE_SPREAD_SHEET;
            await fetch(url, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.log(error, "==> apa sih ini");
        }    
    };


    const handleDownload = async (nama, picName, picNik, picPosition) => {    
        setLoadingButton(true)    
        const loadingToastId = toast.loading("Mengirim data dan menyiapkan PDF...");
        const item = hasilPDF[nama];
        const { blobUrl, data } = item;
        let dataKaryawan = dataList2.find(el => el.NamaKaryawan === nama)
        
        try {
            
            if (!blobUrl) {
                console.error("Blob URL tidak ditemukan!");
                return;
            }

            await sendToSpreadsheet({
                pic: picName,
                nikPic: picNik,
                position: picPosition,
                namaKaryawan: nama,
                jenisJamkar: dataKaryawan?.JenisJamkar || "",
                tanggalTerbit: new Date().toLocaleString()
            });


            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `${nama}_serah_terima.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.update(loadingToastId, {
                render: "Berhasil dikirim & PDF diunduh 🎉",
                type: "success",
                isLoading: false,
                autoClose: 3000,
                closeOnClick: true,
            });
        } catch (error) {
            console.error("Gagal mengunduh atau mengirim data:", error);
            toast.update(loadingToastId, {
                render: "Ups! Gagal kirim atau download 😢",
                type: "error",
                isLoading: false,
                autoClose: 3000,
                closeOnClick: true,
            });
        } finally {
            setLoadingButton(false);
        }
    };  

      
    
    
    return(
        <>
            <div className="d-flex flex-column min-vh-100">
                <div className="main-box container mt-4 p-4 rounded shadow-md h-100 mb-4">
                    <h4>Detail PIC</h4>

                    <div className= "main-box mb-4 p-3 border rounded shadow-sm">
                        {/* Form isi PIC */}
                        <div className="mb-3 d-flex justify-content-around align-items-center">

                            <div className="flex-grow-1 mx-2 border">
                                <label htmlFor="pic-name" className="form-label fw-bold">Name</label>
                                <input type="text" className="form-control" id="pic-name" placeholder="Jhon Doe" onChange={e => setNamePic(e.target.value)}/>
                            </div>
                            <div className="flex-grow-1 mx-2 border">
                                <label htmlFor="pic-nik" className="form-label fw-bold">NIK</label>
                                <input type="text" className="form-control w-30" id="pic-nik" placeholder="1301883-IDN" onChange={e => setNikPic(e.target.value)}/>
                            </div>
                            <div className="flex-grow-1 mx-2 border">
                                <label className="form-label fw-bold">Position</label>
                                <select
                                    className="form-select"
                                    value={positionPic}
                                    onChange={e => setPositionPic(e.target.value)}
                                >
                                    <option value="">-- Pilih --</option>
                                    {options.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-grow-1 mx-2 border">
                                <label htmlFor="pic-nik" className="form-label fw-bold">Upload Tanda Tangan</label>
                                <input type="file" accept=".jpg, .png, .jpeg" className="form-control form-control-md" onChange={handleSignatureUpload}/>
                            </div>

                        </div>

                    </div>

                    <h4>Employees Data</h4>
                    <div className="main-box p-3 border rounded shadow-sm">
                        <div className="mb-3 d-flex justify-content-around">
                            <div className="flex-grow-1 mx-2">
                                <label htmlFor="pic-name" className="form-label fw-bold">Employees Data Upload</label>
                                <input type="file" accept=".xlsx, .xls" className="form-control form-control-md" onChange={handleExcelUpload} />
                                
                            </div>
                            <div className="flex-grow-1 mx-2">
                                <label className="form-label fw-bold">Pilih Nama Untuk Preview</label>
                                <select
                                    className="form-select"
                                    value={selectedNama}
                                    onChange={handlePreviewChange}
                                >
                                    <option value="">-- Pilih --</option>
                                    {Object.keys(hasilPDF).map((nama) => (
                                        <option key={nama} value={nama}>
                                        {nama}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-md btn-block mt-1" style={{width: "100%", backgroundColor: "#FAEB92"}} onClick={generateAll}><i className="bi bi-file-earmark-arrow-down"></i>{"  "}  Generate All PDF</button>
                        </div>
                        
                        {selectedNama && hasilPDF[selectedNama] && (
                        <>
                            <iframe
                                src={hasilPDF[selectedNama].blobUrl}
                                style={{
                                width: "100%",
                                height: "600px",
                                marginTop: "20px",
                                border: "1px solid #ccc",
                                display: "block",
                                }}
                                title="PDF Preview"
                            ></iframe>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-md btn-block mt-3" style={{width: "40%", backgroundColor: "#FAEB92"}} onClick={() => handleDownload(selectedNama, namePic, nikPic, positionPic)} disabled={loadingButton}>
                                Download PDF & Simpan ke Spreadsheet
                            </button>
                        </div>
                        </>
                        )}

                    </div>
                </div>
                <ToastContainer />



                <FooterComponent/>
            </div>
        </>
    )
}