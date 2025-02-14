import "../../../styles/style.min.css";
import "./riderStyle.css"
import profilePic from '../../../assets/profile-img.webp';
import { useState } from 'react';

const AddRider = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    return (
        <main className="main-content">
            <div className="overview-container">
                <div className="page-overview">
                    <h1 className="page-title">Settings</h1>
                </div>
                <div className="main-top-profile">
                    <span className="name">Saksham Pandey</span>
                    <div className="img-container">
                        <img src={profilePic} alt="Profile Image" className="rounded-img" />
                    </div>
                </div>
            </div>
            <div className="action-container">
                <div className="action-left">
                    <p>Add New Rider</p>
                </div>
                <div className="action-right">
                    <button className="button">← </button>
                </div>
            </div>
            <div className="form-container">
                <div className="image-upload">
                    <input type="file" onChange={handleImageChange} />
                    {image && <img src={URL.createObjectURL(image)} alt="Uploaded Image" />}
                </div>
                <div className="input-row">
                    <input type="text" placeholder="Rider Name" />
                    <input type="text" placeholder="Mobile Number" />
                </div>
                <div className="input-row">
                    <input type="text" placeholder="ID Number" />
                    <input type="text" placeholder="City" />
                </div>
                <div className="input-row">
                    <input type="text" placeholder="Contract Start Date" />
                    <input type="text" placeholder="Contract Status" />
                </div>
                <div className="input-row">
                    <input type="password" placeholder="Password" />
                </div>
                <div className="button-container">
                    <button className="button save-button">Save Rider</button>
                </div>
            </div>
        </main>
    );
};

export default AddRider;