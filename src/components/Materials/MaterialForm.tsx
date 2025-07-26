import React, { useState, useEffect } from 'react';
import { Material } from '../../lib/supabase';
import { Button } from '../UI/Button';
import { BarcodeScanner } from '../UI/BarcodeScanner';
import { Scan } from 'lucide-react';

interface MaterialFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (material: Omit<Material, 'id' | 'created_at' | 'updated_at'>) => void;
  initialData?: Material;
  mode: 'create' | 'edit';
  isSubmitting?: boolean;
}

export function MaterialForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
  isSubmitting = false,
}: MaterialFormProps) {
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    barcode: initialData?.barcode || '',
    material_code: initialData?.material_code || '',
    category: initialData?.category || '',
    note: initialData?.note || '',
    unit: initialData?.unit || '',
    initial_stock: initialData?.initial_stock || 0,
    current_stock: initialData?.current_stock || 0,
    min_stock: initialData?.min_stock || 0,
    price: initialData?.price || 0,
    location: initialData?.location || '',
    expiry_date: initialData?.expiry_date || '',
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: initialData?.name || '',
        barcode: initialData?.barcode || '',
        material_code: initialData?.material_code || '',
        category: initialData?.category || '',
        note: initialData?.note || '',
        unit: initialData?.unit || '',
        initial_stock: initialData?.initial_stock || 0,
        current_stock: initialData?.current_stock || 0,
        min_stock: initialData?.min_stock || 0,
        price: initialData?.price || 0,
        location: initialData?.location || '',
        expiry_date: initialData?.expiry_date || '',
      });
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleBarcodeScanned = (barcode: string) => {
    setFormData((prev) => ({ ...prev, barcode }));
    setShowBarcodeScanner(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 text-gray-900">
        {/* Form fields stay unchanged (as before) */}
        {/* You can paste all JSX inputs here if needed */}
      </form>

      <BarcodeScanner
        isOpen={showBarcodeScanner}
        onClose={() => setShowBarcodeScanner(false)}
        onScan={handleBarcodeScanned}
        title="สแกนบาร์โค้ดวัสดุ"
      />
    </>
  );
}
