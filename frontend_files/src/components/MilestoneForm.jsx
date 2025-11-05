import { useState, useRef } from 'react';

/**
 * MilestoneForm Component
 * 
 * Allows contractors to submit milestone evidence including:
 * - Project name and milestone type
 * - GPS coordinates (with auto-detect)
 * - Evidence photos with preview
 * - Detailed work description
 * - Contractor wallet address
 * 
 * @param {Function} onSubmit - Callback when form is submitted
 * @param {Boolean} loading - Loading state while processing
 */
export default function MilestoneForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    projectName: '',
    milestone: '',
    contractorAddress: '',
    gpsCoordinates: '',
    description: '',
    estimatedBudget: 1000,
  });

  const [photos, setPhotos] = useState([]);
  const [photoPreview, setPhotoPreview] = useState([]);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setPhotos(files);

    // Generate previews
    setPhotoPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreview((prev) => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAutoGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const coords = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setFormData((prev) => ({
            ...prev,
            gpsCoordinates: coords,
          }));
        },
        () => {
          alert('Unable to access location. Please enter GPS coordinates manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.projectName || !formData.milestone || !formData.description) {
      alert('Please fill in all required fields.');
      return;
    }

    onSubmit(formData);
  };

  const clearPhotos = () => {
    setPhotos([]);
    setPhotoPreview([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
      <h2 className="text-2xl font-bold text-white mb-6">📋 Submit Milestone Evidence</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project & Milestone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Project Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              placeholder="e.g., Lagos Road Rehabilitation"
              disabled={loading}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Milestone Type <span className="text-red-400">*</span>
            </label>
            <select
              name="milestone"
              value={formData.milestone}
              onChange={handleInputChange}
              disabled={loading}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 disabled:opacity-50"
            >
              <option value="">Select Milestone</option>
              <option value="site_prep">Site Preparation Complete</option>
              <option value="foundation">Foundation Work Complete</option>
              <option value="materials">Materials Delivered</option>
              <option value="structural">Structural Work Complete</option>
              <option value="paving">Road Paving Complete</option>
              <option value="completion">Project 50% Complete</option>
            </select>
          </div>
        </div>

        {/* GPS & Budget Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              GPS Coordinates <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="gpsCoordinates"
                value={formData.gpsCoordinates}
                onChange={handleInputChange}
                placeholder="e.g., 6.5244, 3.3792"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={handleAutoGPS}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Auto-detect using browser location"
              >
                📍
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Estimated Budget (USDC)
            </label>
            <input
              type="number"
              name="estimatedBudget"
              value={formData.estimatedBudget}
              onChange={handleInputChange}
              min="100"
              disabled={loading}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Contractor Address */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Contractor Wallet Address
          </label>
          <input
            type="text"
            name="contractorAddress"
            value={formData.contractorAddress}
            onChange={handleInputChange}
            placeholder="0x..."
            disabled={loading}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 disabled:opacity-50"
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Upload Evidence Photos (Optional)
          </label>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            disabled={loading}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-semibold file:cursor-pointer hover:file:bg-blue-700 disabled:opacity-50"
          />
          {photos.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-slate-400 mb-2">{photos.length} photo(s) selected</p>
              <div className="grid grid-cols-3 gap-3">
                {photoPreview.map((preview, idx) => (
                  <img
                    key={idx}
                    src={preview}
                    alt={`Preview ${idx + 1}`}
                    className="rounded-lg h-24 object-cover border border-slate-600"
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={clearPhotos}
                disabled={loading}
                className="mt-2 text-sm text-red-400 hover:text-red-300 disabled:opacity-50"
              >
                Clear photos
              </button>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Work Description <span className="text-red-400">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe the completed work in detail..."
            disabled={loading}
            rows="5"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 resize-none disabled:opacity-50"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin">⏳</span>
              Verifying with AI...
            </>
          ) : (
            <>
              ✓ Submit for AI Review
            </>
          )}
        </button>
      </form>
    </div>
  );
}
