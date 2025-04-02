import React from 'react';
import ImageUpload from '../../../common/components/ImageUpload';

const ImageUploadPage: React.FC = () => {
    const userId = 'sample-user-id'; // Thay thế bằng ID người dùng thực tế

    return (
        <div>
            <h1>Upload Image</h1>
            <ImageUpload userId={userId} />
        </div>
    );
};

export default ImageUploadPage;
