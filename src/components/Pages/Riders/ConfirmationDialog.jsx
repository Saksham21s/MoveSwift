import "./riderStyle.css";
import PropTypes from 'prop-types';
import deleteUser from '../../../assets/delete-user.png';
import blockUser from '../../../assets/block-user.png';
import unblockUser from '../../../assets/delete-user.png';
import resumeUser from '../../../assets/block-user.png';

const ConfirmationDialog = ({ actionType, onConfirm, onCancel, title, message }) => {  

    const getImage = () => {
        switch (actionType) {
            case 'block': return blockUser;
            case 'delete': return deleteUser;
            case 'unblock': return unblockUser;
            case 'resume': return resumeUser;
            default: return blockUser;
        }
    };

    const getHeading = () => {
        return title || (() => {
            switch (actionType) {
                case 'block': return "Block Rider(s) ?";
                case 'delete': return "Delete Rider(s) ?";
                case 'unblock': return "Unblock Rider(s) ?";
                case 'resume': return "Resume Rider(s) ?";
                case 'view': return "View Complaint Details"; 
                case 'resolve': return "Resolve Complaint";
                default: return "Confirmation";
            }
        })();
    };

    const getParagraph = () => {
        return message || (() => { 
            switch (actionType) {
                case 'block':
                    return "Clicking the proceed button will deny the rider(s) access into the entire system. Would you like to proceed?";
                case 'delete':
                    return "Clicking the proceed button will delete the rider(s) from the Active list and will be added to the Deleted list. Would you like to proceed?";
                case 'unblock':
                    return "Clicking the proceed button will provide the rider(s) access into the entire system and will be added to the Active list. Would you like to proceed?";
                case 'resume':
                    return "Clicking the proceed button will provide the rider(s) access into the entire system and will be added to the Active list. Would you like to proceed?";
                case 'view':
                    return "You will able to see this section soon."; 
                case 'resolve':
                    return "Your Query will be resolved soon."; 
                default:
                    return "Are you sure you want to proceed with this action?";
            }
        })();
    };

    return (
        <div className="overlay">
            <div className="dialog">
                <div className="dialog-content">
                    <div className="dialog-image">
                        <img src={getImage()} alt={getHeading()} />
                    </div>
                    <div className="dialog-heading">
                        <h3>{getHeading()}</h3>
                    </div>
                    <div className="dialog-paragraph">
                        <p>{getParagraph()}</p>
                    </div>
                    <div className="dialog-buttons-container">
                        <div className="dialog-buttons">
                            <button className="button confirm" onClick={onConfirm}>Proceed</button>
                        </div>
                        <div className="dialog-buttons">
                            <button className="button cancel" onClick={onCancel}>Cancel</button>
                        </div>
                    </div>
                    <button className="close-button" onClick={onCancel}>
                        <svg className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

ConfirmationDialog.propTypes = {
    actionType: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string, 
};

export default ConfirmationDialog;