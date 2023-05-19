'use client';

import { useEffect } from 'react';

interface ReportViewProps {
  listingId: number;
}

export const ReportView: React.FC<ReportViewProps> = ({ listingId }) => {
  useEffect(() => {
    fetch(`/api/listing/${listingId}`, {
      method: 'PATCH',
    });
  }, [listingId]);

  return null;
};
