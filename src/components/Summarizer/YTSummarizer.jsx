import React, { useState } from 'react';
import axios from 'axios';
import { FaArrowRight, FaEraser, FaArrowLeft, FaCloudDownloadAlt, FaFilePdf } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../spinner/Spinner';
import NavBar from '../NavBar';
import NavBreadcrumb from '../../pages/BreadCrumb/BreadCrumb';
import Cookies from 'js-cookie'; 


export default function YTSummarizer({ BASE_URL }) {
    const btnStyle = { backgroundColor: '#FF683B', color: 'white' };
    const cancelStyle = { backgroundColor: '#dc3545', color: 'white' };
    const headingStyle = { color: '#dc3545' };

    const [formData, setFormData] = useState({ video_url: '' });
    const [apiResponse, setApiResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handle form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const breadcrumbItems = [
        { label: 'Main Panel', href: '/MainPlanner', active: false },
        { label: 'Summarizer', active: true },
        { label: 'YouTube Summarizer', active: true }
    ];

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { video_url } = formData;

        if (!video_url) {
            toast.error('Please provide a video URL.');
            return;
        }

        // Retrieve cookies for headers
        const authToken = Cookies.get('authToken');
        const siteUrl = Cookies.get('site_url');

        setIsLoading(true);
        try {
            const response = await axios.post(
                `${BASE_URL}/YT_summarize`,
                { video_url },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                        'X-Site-Url': siteUrl
                    }
                }
            );
            setApiResponse(response.data);
            setFormData({ video_url: '' });
            toast.success('Summary generated successfully!');
        } catch (error) {
            toast.warning(`${error.response.data.error}`);
            setFormData({ video_url: '' });
        } finally {
            setIsLoading(false);
        }
    };

    const renderSummary = (summaryData) => {
        return (
            <div className="accordion mt-3 mb-4" id="accordionExample">
                <h3 className="mb-3 text-center" style={headingStyle}><strong>Your Youtube Summarizer</strong></h3>
                {summaryData.summarizer.map((section, index) => (
                    <div key={index} className="col-md-6 offset-md-3 accordion-item">
                        <h2 className="accordion-header" id={`heading${index}`}>
                            <button
                                className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index}`}
                                aria-expanded={index === 0 ? 'true' : 'false'}
                                aria-controls={`collapse${index}`}
                            >
                                <strong>{section.title}:</strong>
                                <strong className='ms-2'>{section.timestamp}</strong>
                            </button>
                        </h2>
                        <div
                            id={`collapse${index}`}
                            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                            aria-labelledby={`heading${index}`}
                            data-bs-parent="#accordionExample"
                        >
                            <div className="accordion-body justify-content-start">
                                <p><strong>{section.summary}</strong></p>
                                {section.points ? (
                                    <div>
                                        {section.points.map((point, idx) => (
                                            <div key={idx} className="mt-3">
                                                <strong>{point.title}</strong> <span>({point.timestamp})</span>
                                                <ul>
                                                    {point.details.map((detail, idy) => (
                                                        <li key={idy}>{detail}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div>
                                        {section.details.map((detail, idx) => (
                                            <li key={idx}>{detail}</li>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };


    return (
        <>
            <NavBar />
            <ToastContainer position="top-right" autoClose={1500} />
            <div className="container-fluid">
                <div className="row justify-content-center mt-5">

                    {isLoading ? (
                        <div className="col-md-5 text-center">
                            <Spinner />
                        </div>
                    ) : (
                        !apiResponse ? (
                            <>
                                <NavBreadcrumb items={breadcrumbItems} />
                                <div className="col-md-5 border border-4 rounded-3 pt-4 pb-3 ps-5 pe-5 shadow p-3 bg-body rounded">
                                    <form onSubmit={handleSubmit}>
                                        <h4 className="text-center mb-3">YouTube Summarizer</h4>
                                        <div className="mb-3">
                                            <label htmlFor="video_url" className="form-label">
                                                Youtube Video URL <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm mb-2"
                                                id="video_url"
                                                name="video_url"
                                                value={formData.video_url}
                                                onChange={handleChange}
                                                disabled={isLoading}
                                                placeholder="Enter YouTube Video URL"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <small className="text-muted">
                                                <strong className='text-danger'>Note:</strong>
                                                <ul>
                                                    <li>Please ensure the YouTube video includes subtitles.</li>
                                                    <li>The video should not exceed 30 minutes in duration.</li>
                                                </ul>
                                            </small>
                                        </div>

                                        <div className="d-flex justify-content-between mt-3">
                                            <button
                                                type="button"
                                                className="btn btn-sm"
                                                style={cancelStyle}
                                                onClick={() => setFormData({ video_url: '' })}
                                                disabled={isLoading}
                                            >
                                                <FaEraser /> Reset
                                            </button>
                                            <button type="submit" className="btn btn-sm" style={btnStyle} disabled={isLoading}>
                                                Summarize <FaArrowRight />
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        ) : (
                            <div className="mt-3">
                                {renderSummary(apiResponse)}
                                <div className="text-center">
                                    <button className="btn btn-sm mt-2 mb-3 me-2" style={btnStyle} onClick={() => setApiResponse(null)}>
                                        <FaArrowLeft /> Summarize Another Video
                                    </button>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    );
}
