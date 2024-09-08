// src/components/UploadImage.js
import React, { useState } from "react";

function UploadImage() {
  const [eventId, setEventId] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("eventId", eventId);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:5001/api/events/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event ID:</label>
          <input
            type="text"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadImage;
