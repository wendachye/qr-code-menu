'use client';

import { useState } from 'react';
import { Document as PdfDocument, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import styled from 'styled-components';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const Document = styled(PdfDocument)`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
    position: relative;
`;

const PageControl = styled.div`
    position: absolute;
    z-index: 2;
    bottom: 5%;
    left: 50%;
    background-color: #FFFFFF;
    transform: translate(-50%);
    transition: opacity ease-in-out 0.2s;
    border-radius: 4px;
    box-shadow: 0 30px 40px 0 rgba(16, 36, 94, .2);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;

    span {
        color: #000000
    }

    button {
        all: unset;
        cursor: pointer;
        color: #000000;
        width: 44px;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const Menu = () => {
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const onDocumentLoadSuccess = ({ numPages } : { numPages: number }) => {
        setTotalPages(numPages);
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    }

    const handlNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    }

    return (
        <main>
            <object
                style={{ height: "100vh", width: "100%" }}
                data="/menu.pdf#toolbar=0"
                type="application/pdf"
            />
            {/* <Document
                file="/menu.pdf" 
                onLoadError={() => {
                    console.log("ERROR");
                }}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={currentPage} />
                <PageControl>
                    <button type="button" onClick={handlePreviousPage}>‹</button>
                    <span>{`${currentPage} of ${totalPages}`}</span>
                    <button type="button" onClick={handlNextPage}>›</button>
                </PageControl>
            </Document> */}
        </main>
    )
}

export default Menu