/**
 * Formats an ISO date string into a readable format (e.g., "Feb 28, 2026")
 * @param {string} dateString - The ISO date string to format
 * @returns {string} - The formatted date
 */
export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';

    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  /**
   * Calculates the relative time from now (e.g., "2 days ago")
   * @param {string} dateString - The ISO date string
   * @returns {string} - The relative time string
   */
  export const formatTimeAgo = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;

    return formatDate(dateString);
  };
