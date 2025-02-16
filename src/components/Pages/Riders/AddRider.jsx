import "../../../styles/style.min.css";
import "./riderStyle.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../../assets/upload-img.png';
import alert from '../../../assets/delete-user.png';
import MainTop from '../Navbar/MainTop';


const AddRider = () => {
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        riderName: "",
        mobileNumber: "",
        idNumber: "",
        city: "",
        contractStart: "",
        contractStatus: "active",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.riderName.trim()) newErrors.riderName = "Rider name is required";
        if (!formData.mobileNumber.trim()) newErrors.mobileNumber = "Mobile number is required";
        if (!formData.idNumber.trim()) newErrors.idNumber = "ID number is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.contractStart) newErrors.contractStart = "Contract start date is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate('/riders');
            }, 3000);
        }
    };

    return (
        <main className={`main-content ${showSuccess ? 'blur-background' : ''}`}>
            <MainTop title="Riders" />
            <div className="action-container">
                <div className="action-left">
                    <p>Add New Rider</p>
                </div>
                <div className="action-right">
                    <button className="button" onClick={() => navigate('/riders')}>
                        ← &nbsp;&nbsp;&nbsp;Back
                    </button>
                </div>
            </div>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="image-upload">
                    <label htmlFor="image-upload-input">
                        <img src={image ? URL.createObjectURL(image) : defaultImage} alt="Uploaded" style={{ cursor: 'pointer' }} />
                    </label>
                    <input type="file" id="image-upload-input" style={{ display: 'none' }} onChange={handleImageChange} />
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="rider-name">Rider Name</label>
                        <input type="text" name="riderName" placeholder="Rider Name" value={formData.riderName} onChange={handleChange} />
                        {errors.riderName && <span className="error">{errors.riderName}</span>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="mobile-number">Mobile Number</label>
                        <input type="number" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} />
                        {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="id-number">ID Number</label>
                        <input type="text" name="idNumber" placeholder="ID Number" value={formData.idNumber} onChange={handleChange} />
                        {errors.idNumber && <span className="error">{errors.idNumber}</span>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                        {errors.city && <span className="error">{errors.city}</span>}
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="contract-start">Contract Start Date</label>
                        <input type="date" name="contractStart" value={formData.contractStart} onChange={handleChange} />
                        {errors.contractStart && <span className="error">{errors.contractStart}</span>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="contract-status">Contract Status</label>
                        <select name="contractStatus" value={formData.contractStatus} onChange={handleChange}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="password">Password</label><br />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                </div>
                <div className="button-container">
                    <button type="submit" className="button save-button">Save Rider</button>
                </div>
            </form>

            {showSuccess && (
                <div className="success-popup">
                    <div className="dialog-content">
                        <div className="dialog-image">
                            <img src={alert} alt="Alert" />
                        </div>
                        <div className="dialog-heading">
                            <h3>Your Data is Saved</h3>
                        </div>
                        <div className="dialog-paragraph">
                            <p>Your Data is Saved in Our Server. Dont worry we keep our riders data secure and encrypted.</p>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default AddRider;
