import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import { Button, Input, Layout, Row } from 'antd';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

const { Content } = Layout;

const PDFOkuyucu = () => {
    const [url, setUrl] = useState<string>(
        'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf'
    );
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [inputUrl, setInputUrl] = useState<string>(url);

    const onNextPage = () => {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
    };

    const onPreviousPage = () => {
        setPageNumber((prevPageNumber) => prevPageNumber - 1);
    };

    const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputUrl(e.target.value);
    };

    const updateUrl = () => {
        setUrl(inputUrl);
        setPageNumber(1);
    };

    const styles = {
        content: {
            padding: '50px',
            position: 'relative' as 'relative',
        },
        urlInputRow: {
            marginBottom: '16px',
        },
        buttonContainer: {
            position: 'fixed' as 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            background: 'rgba(255, 255, 255, 0.9)',
            zIndex: 10,
            padding: '8px',
            display: 'flex',
            justifyContent: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        buttonMarginLeft: {
            marginLeft: '8px',
        },
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={styles.content}>
                <Row justify="center" align="middle" style={styles.urlInputRow}>
                    <Input placeholder="Enter PDF URL" value={inputUrl} onChange={onUrlChange} />
                    <Button type="primary" onClick={updateUrl} style={styles.buttonMarginLeft}>
                        Update
                    </Button>
                </Row>
                <div style={styles.buttonContainer}>
                    <Button type="primary" onClick={onPreviousPage} disabled={pageNumber <= 1}>
                        Previous
                    </Button>
                    <Button type="primary" onClick={onNextPage} style={styles.buttonMarginLeft}>
                        Next
                    </Button>
                </div>
                <Row justify="center" style={{ marginTop: '48px' }}>
                    <Document file={url}>
                        <Page pageNumber={pageNumber} width={Math.max(window.innerWidth * 0.8, 390)} />
                    </Document>
                </Row>
            </Content>
        </Layout>
    );
};

export default PDFOkuyucu;
