import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { garageService } from "../services/garageService";
import { compressImage } from "../utils/imageCompressor";

function Garage({ user, onLogout }) {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageRemoved, setImageRemoved] = useState(false);

  const deleteTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadCars();
    return () => {
      if (deleteTimeoutRef.current) {
        clearTimeout(deleteTimeoutRef.current);
      }
    };
  }, []);

  const loadCars = async () => {
    try {
      setLoading(true);
      const data = await garageService.getCars();
      setCars(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/");
  };

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const openAddModal = () => {
    setSelectedCar(null);
    setImagePreview(null);
    setImageRemoved(false);
    setModalError(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (car) => {
    setSelectedCar(car);
    setImagePreview(car?.imageUrl || null);
    setImageRemoved(false);
    setModalError(null);
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setSelectedCar(null);
    setImagePreview(null);
    setImageRemoved(false);
    setModalError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openDetailModal = async (car) => {
    try {
      const detailedCar = await garageService.getCar(car.id);
      setSelectedCar(detailedCar);
      setIsDetailModalOpen(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedCar(null);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file);
        setImagePreview(compressed);
        setImageRemoved(false);
        setModalError(null);
      } catch (err) {
        setModalError(err.message);
      }
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageRemoved(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    let finalImageUrl = undefined;
    if (imageRemoved) {
      finalImageUrl = "";
    } else if (imagePreview && imagePreview !== selectedCar?.imageUrl) {
      finalImageUrl = imagePreview;
    } else if (selectedCar) {
      finalImageUrl = null;
    } else {
      finalImageUrl = imagePreview || null;
    }

    const carData = {
      name: formData.get("name"),
      licensePlate: formData.get("licensePlate"),
      nextServiceDate: formData.get("nextServiceDate"),
      imageUrl: finalImageUrl,
    };

    try {
      setIsSubmitting(true);
      setModalError(null);

      if (selectedCar) {
        await garageService.updateCar(selectedCar.id, carData);
      } else {
        await garageService.createCar(carData);
      }

      await loadCars();
      closeAddModal();
    } catch (err) {
      setModalError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (deleteConfirmId !== id) {
      setDeleteConfirmId(id);
      if (deleteTimeoutRef.current) {
        clearTimeout(deleteTimeoutRef.current);
      }
      deleteTimeoutRef.current = setTimeout(() => {
        setDeleteConfirmId(null);
      }, 3000);
      return;
    }

    if (deleteTimeoutRef.current) {
      clearTimeout(deleteTimeoutRef.current);
    }
    setDeleteConfirmId(null);

    try {
      await garageService.deleteCar(id);
      await loadCars();
      if (selectedCar && selectedCar.id === id) {
        closeDetailModal();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Neuvedené";
    const cleanDate = String(dateString).split("T")[0];
    const parts = cleanDate.split("-");
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return `${parseInt(day, 10)}.${parseInt(month, 10)}.${year}`;
    }
    const date = new Date(dateString);
    return date.toLocaleDateString("sk-SK");
  };

  const getStatusBadge = (status) => {
    if (status === "OK") {
      return (
        <span className="px-3 py-1 bg-success/10 text-success rounded-full text-xs font-bold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-success"></span>V poriadku
        </span>
      );
    }
    if (status === "WARNING") {
      return (
        <span className="px-3 py-1 bg-warning/10 text-warning rounded-full text-xs font-bold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-warning animate-pulse"></span>
          STK o 14 dní
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-error/10 text-error rounded-full text-xs font-bold flex items-center gap-1">
        <span className="w-2 h-2 rounded-full bg-error"></span>
        Vyžaduje pozornosť
      </span>
    );
  };

  const vehicleCount = cars.length;
  const upcomingDeadlines = cars.filter((c) => c.status === "WARNING").length;
  const monthlyExpenses = 0;

  return (
    <div className="flex min-h-screen bg-base-100">
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-surface border border-base-300 rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-all duration-150"
      >
        <span className="material-symbols-outlined text-primary">
          {isMobileOpen ? "close" : "menu"}
        </span>
      </button>

      <aside
        className={`
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          md:flex md:flex-col flex-col h-screen py-4 gap-4 bg-surface-container-low border-r border-base-300 
          fixed md:relative top-0 left-0 z-40 transition-all duration-300 ease-in-out
          ${isCollapsed ? "md:w-20 px-2" : "md:w-64 px-4"}
        `}
      >
        <button
          onClick={toggleCollapse}
          className="hidden md:flex absolute -right-3 top-20 w-6 h-6 bg-surface border border-base-300 rounded-full items-center justify-center shadow-sm hover:bg-primary hover:text-on-primary hover:scale-110 active:scale-95 transition-all duration-150 z-50 group"
        >
          <span className="material-symbols-outlined text-xs text-on-surface-variant group-hover:text-on-primary">
            {isCollapsed ? "chevron_right" : "chevron_left"}
          </span>
        </button>

        <div
          className={`flex items-center gap-3 mb-4 ${isCollapsed ? "justify-center" : "px-2"}`}
        >
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary flex-shrink-0">
            <span className="material-symbols-outlined">directions_car</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-headline-sm text-headline-sm font-bold text-primary">
                AutoLog
              </h1>
              <p className="text-xs text-outline font-label-sm uppercase tracking-wider">
                Service Book
              </p>
            </div>
          )}
        </div>

        {user && (
          <div className="mb-4">
            <div
              className={`flex items-center gap-3 bg-surface-container rounded-lg transition-all duration-200 ${
                isCollapsed ? "justify-center w-10 h-10 mx-auto" : "p-3"
              }`}
            >
              <span className="material-symbols-outlined text-xl text-primary flex-shrink-0">
                account_circle
              </span>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="font-label-md text-label-md font-bold text-primary truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <button
                    onClick={handleLogoutClick}
                    className="text-xs text-error hover:underline active:scale-95 transition-all duration-150"
                  >
                    Odhlásiť sa
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <nav className="flex-1 flex flex-col gap-2">
          <a
            href="#"
            onClick={() => setIsMobileOpen(false)}
            className={`flex items-center gap-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold transition-all duration-150 active:scale-[0.98] hover:shadow-sm ${
              isCollapsed ? "justify-center w-10 h-10 mx-auto" : "px-4 py-2.5"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              directions_car
            </span>
            {!isCollapsed && (
              <span className="font-label-md text-label-md">Moja garáž</span>
            )}
          </a>

          <a
            href="#"
            onClick={() => setIsMobileOpen(false)}
            className={`flex items-center gap-3 text-on-surface-variant rounded-lg transition-all duration-150 hover:bg-surface-container-high active:scale-[0.98] ${
              isCollapsed ? "justify-center w-10 h-10 mx-auto" : "px-4 py-2.5"
            }`}
          >
            <span className="material-symbols-outlined">history</span>
            {!isCollapsed && (
              <span className="font-label-md text-label-md">
                Servisná história
              </span>
            )}
          </a>

          <a
            href="#"
            onClick={() => setIsMobileOpen(false)}
            className={`flex items-center gap-3 text-on-surface-variant rounded-lg transition-all duration-150 hover:bg-surface-container-high active:scale-[0.98] ${
              isCollapsed ? "justify-center w-10 h-10 mx-auto" : "px-4 py-2.5"
            }`}
          >
            <span className="material-symbols-outlined">payments</span>
            {!isCollapsed && (
              <span className="font-label-md text-label-md">Náklady</span>
            )}
          </a>

          <a
            href="#"
            onClick={() => setIsMobileOpen(false)}
            className={`flex items-center gap-3 text-on-surface-variant rounded-lg transition-all duration-150 hover:bg-surface-container-high active:scale-[0.98] ${
              isCollapsed ? "justify-center w-10 h-10 mx-auto" : "px-4 py-2.5"
            }`}
          >
            <span className="material-symbols-outlined">notifications</span>
            {!isCollapsed && (
              <span className="font-label-md text-label-md">Upozornenia</span>
            )}
          </a>

          <div className="mt-auto border-t border-base-300 pt-4 flex flex-col gap-2">
            <a
              href="#"
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center gap-3 text-on-surface-variant rounded-lg transition-all duration-150 hover:bg-surface-container-high active:scale-[0.98] ${
                isCollapsed ? "justify-center w-10 h-10 mx-auto" : "px-4 py-2.5"
              }`}
            >
              <span className="material-symbols-outlined">settings</span>
              {!isCollapsed && (
                <span className="font-label-md text-label-md">Nastavenia</span>
              )}
            </a>
          </div>
        </nav>
      </aside>

      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <main
        className={`
                flex-1 min-w-0 bg-base-100 
                ${isMobileOpen ? "pl-12" : "p-6"} 
                md:p-10 
                max-w-[1280px] 
                mx-auto
            `}
      >
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-primary">
              Moja garáž
            </h2>
            <p className="text-on-surface-variant font-body-md text-body-md">
              Prehľad a správa vašich vozidiel.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-150"
          >
            <span className="material-symbols-outlined">add</span>
            Pridať vozidlo
          </button>
        </header>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="bg-error-container text-on-error-container p-4 rounded-lg mb-8">
            <p className="font-label-md text-label-md">
              Chyba pri načítavaní vozidiel: {error}
            </p>
          </div>
        )}

        {!loading && !error && (
          <>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-xl border border-base-300 shadow-sm flex items-center gap-5 hover:border-primary/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">
                    directions_car
                  </span>
                </div>
                <div>
                  <p className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-tight">
                    Počet vozidiel
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {vehicleCount}
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-base-300 shadow-sm flex items-center gap-5 hover:border-primary/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center text-warning">
                  <span className="material-symbols-outlined">event_note</span>
                </div>
                <div>
                  <p className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-tight">
                    Blížiace sa termíny
                  </p>
                  <p className="text-2xl font-bold text-warning">
                    {upcomingDeadlines}
                  </p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-base-300 shadow-sm flex items-center gap-5 hover:border-primary/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <div>
                  <p className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-tight">
                    Náklady (mesiac)
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {monthlyExpenses} €
                  </p>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-6">
                <h3 className="font-headline-md text-headline-md text-primary px-1">
                  Vozidlá
                </h3>

                {cars.length === 0 ? (
                  <div className="bg-white p-12 rounded-xl border border-base-300 shadow-sm text-center">
                    <span className="material-symbols-outlined text-5xl text-outline mb-4">
                      directions_car
                    </span>
                    <p className="text-on-surface-variant font-label-md text-label-md mb-2">
                      Zatiaľ nemáte žiadne vozidlá
                    </p>
                    <p className="text-outline font-body-sm text-body-sm mb-6">
                      Pridajte svoje prvé vozidlo a začnite sledovať jeho
                      servisnú históriu.
                    </p>
                    <button
                      onClick={openAddModal}
                      className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md text-label-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-150"
                    >
                      Pridať vozidlo
                    </button>
                  </div>
                ) : (
                  cars.map((car) => (
                    <div
                      key={car.id}
                      className="group bg-white rounded-xl border border-base-300 overflow-hidden shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-64 h-48 md:h-auto overflow-hidden bg-surface-container">
                          {car.imageUrl ? (
                            <img
                              src={car.imageUrl}
                              alt={car.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-6xl text-outline">
                                directions_car
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-headline-sm text-headline-sm text-primary">
                                {car.name}
                              </h4>
                              <p className="text-on-surface-variant font-label-md text-label-md font-bold bg-base-200 inline-block px-2 py-1 rounded mt-1">
                                {car.licensePlate}
                              </p>
                            </div>
                            {getStatusBadge(car.status)}
                          </div>

                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-base-200">
                            <div>
                              <p className="text-xs text-outline uppercase font-label-sm">
                                Ďalší servis
                              </p>
                              <p className="font-body-md text-body-md font-semibold">
                                {formatDate(car.nextServiceDate)}
                              </p>
                            </div>
                            <div className="text-right flex items-center justify-end gap-2">
                              <button
                                onClick={() => openDetailModal(car)}
                                className="text-primary font-label-md text-label-md hover:underline hover:text-primary-hover active:scale-95 transition-all duration-150 flex items-center gap-1"
                              >
                                Detaily
                                <span className="material-symbols-outlined text-sm">
                                  arrow_forward
                                </span>
                              </button>
                              <button
                                onClick={() => openEditModal(car)}
                                className="text-on-surface-variant hover:text-primary active:scale-95 hover:scale-105 transition-all duration-150 p-1.5 rounded-md hover:bg-surface-container"
                                title="Upraviť vozidlo"
                              >
                                <span className="material-symbols-outlined text-sm">
                                  edit
                                </span>
                              </button>
                              <button
                                onClick={() => handleDelete(car.id)}
                                className={`text-on-surface-variant hover:text-error active:scale-95 hover:scale-105 transition-all duration-150 p-1.5 rounded-md hover:bg-error/10 ${
                                  deleteConfirmId === car.id
                                    ? "text-error bg-error/15 font-bold px-2"
                                    : ""
                                }`}
                                title={
                                  deleteConfirmId === car.id
                                    ? "Kliknite znova pre zmazanie"
                                    : "Odstrániť vozidlo"
                                }
                              >
                                {deleteConfirmId === car.id ? (
                                  <span className="font-label-sm text-xs flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs">
                                      warning
                                    </span>
                                    Naozaj zmazať?
                                  </span>
                                ) : (
                                  <span className="material-symbols-outlined text-sm">
                                    delete
                                  </span>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <aside className="space-y-6">
                <h3 className="font-headline-md text-headline-md text-primary px-1">
                  Nedávna aktivita
                </h3>
                <div className="bg-white rounded-xl border border-base-300 p-6 shadow-sm">
                  <div className="space-y-6">
                    {cars.length === 0 ? (
                      <p className="text-on-surface-variant font-body-sm text-body-sm text-center py-4">
                        Žiadna aktivita
                      </p>
                    ) : (
                      <div className="flex gap-4">
                        <div className="mt-1 w-8 h-8 rounded-full bg-info/10 flex items-center justify-center text-info flex-shrink-0">
                          <span className="material-symbols-outlined text-base">
                            receipt_long
                          </span>
                        </div>
                        <div>
                          <p className="font-label-md text-label-md text-primary">
                            Vitajte v AutoLog!
                          </p>
                          <p className="text-xs text-on-surface-variant mt-0.5">
                            Pridajte svoje prvé vozidlo
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <button className="w-full mt-8 py-2 text-center text-primary font-label-md text-label-md hover:bg-surface-container active:scale-[0.98] transition-all duration-150 rounded-lg">
                    Zobraziť všetko
                  </button>
                </div>

                <div className="bg-primary p-6 rounded-xl text-on-primary shadow-sm relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="font-headline-sm text-headline-sm mb-2">
                      Pripomenutie
                    </h4>
                    <p className="text-on-primary/80 font-body-sm text-body-sm mb-4">
                      Nezabudnite nahrať poslednú servisnú faktúru pre lepšie
                      sledovanie nákladov.
                    </p>
                    <button className="bg-white/10 hover:bg-white/25 px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm transition-all duration-150 active:scale-[0.97]">
                      Nahrať teraz
                    </button>
                  </div>
                  <span className="material-symbols-outlined absolute -bottom-6 -right-6 text-9xl opacity-10 rotate-12">
                    description
                  </span>
                </div>
              </aside>
            </div>
          </>
        )}
      </main>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-base-200">
              <h3 className="font-headline-md text-headline-md text-primary">
                {selectedCar ? "Upraviť vozidlo" : "Pridať vozidlo"}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {modalError && (
                <div className="bg-error/10 text-error p-3 rounded-lg text-sm">
                  {modalError}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">
                  Názov vozidla
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={selectedCar?.name || ""}
                  className="w-full px-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">
                  SPZ
                </label>
                <input
                  type="text"
                  name="licensePlate"
                  required
                  defaultValue={selectedCar?.licensePlate || ""}
                  className="w-full px-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">
                  Ďalší servis
                </label>
                <input
                  type="date"
                  name="nextServiceDate"
                  required
                  defaultValue={
                    selectedCar?.nextServiceDate
                      ? String(selectedCar.nextServiceDate).split("T")[0]
                      : ""
                  }
                  className="w-full px-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">
                  Obrázok vozidla (voliteľné)
                </label>

                {imagePreview ? (
                  <div className="mb-3 space-y-2">
                    <div className="relative w-full h-40 bg-surface-container rounded-lg overflow-hidden border border-base-200">
                      <img
                        src={imagePreview}
                        alt="Náhľad vozidla"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-error text-white p-1.5 rounded-full transition-colors flex items-center justify-center shadow"
                        title="Odstrániť obrázok"
                      >
                        <span className="material-symbols-outlined text-sm">
                          close
                        </span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-xs text-on-surface-variant">
                      <span>Aktuálny obrázok</span>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="text-error hover:underline flex items-center gap-1 font-medium"
                      >
                        <span className="material-symbols-outlined text-xs">
                          delete
                        </span>
                        Odstrániť obrázok
                      </button>
                    </div>
                  </div>
                ) : null}

                <input
                  ref={fileInputRef}
                  type="file"
                  name="imageUrl"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                />
                <p className="text-xs text-outline mt-1">
                  Obrázok bude automaticky optimalizovaný a zmenšený.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="flex-1 px-4 py-2 border border-base-300 rounded-lg text-on-surface-variant hover:bg-surface-container hover:border-primary/30 active:scale-[0.98] transition-all duration-150"
                >
                  Zrušiť
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-primary text-on-primary rounded-lg hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmitting
                    ? "Ukladá sa..."
                    : selectedCar
                      ? "Uložiť zmeny"
                      : "Pridať vozidlo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDetailModalOpen && selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-base-200 flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-primary">
                Podrobnosti vozidla
              </h3>
              <button
                onClick={closeDetailModal}
                className="text-on-surface-variant hover:text-primary hover:bg-surface-container active:scale-90 rounded-full p-1 transition-all duration-150"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="aspect-video bg-surface-container rounded-lg overflow-hidden">
                {selectedCar.imageUrl ? (
                  <img
                    src={selectedCar.imageUrl}
                    alt={selectedCar.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-outline">
                      directions_car
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-outline uppercase font-label-sm">
                    Názov
                  </p>
                  <p className="font-body-md text-body-md font-semibold">
                    {selectedCar.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-outline uppercase font-label-sm">
                    SPZ
                  </p>
                  <p className="font-body-md text-body-md font-semibold">
                    {selectedCar.licensePlate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-outline uppercase font-label-sm">
                    Ďalší servis
                  </p>
                  <p className="font-body-md text-body-md font-semibold">
                    {formatDate(selectedCar.nextServiceDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-outline uppercase font-label-sm">
                    Stav
                  </p>
                  <div className="mt-1">
                    {getStatusBadge(selectedCar.status)}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    const carToEdit = selectedCar;
                    closeDetailModal();
                    openEditModal(carToEdit);
                  }}
                  className="flex-1 px-4 py-2 bg-primary text-on-primary rounded-lg hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">
                    edit
                  </span>
                  Upraviť
                </button>
                <button
                  onClick={() => handleDelete(selectedCar.id)}
                  className={`px-4 py-2 border border-error text-error rounded-lg hover:bg-error/15 transition-all duration-150 flex items-center justify-center gap-2 ${
                    deleteConfirmId === selectedCar.id
                      ? "bg-error text-white hover:bg-error/90 font-bold"
                      : ""
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {deleteConfirmId === selectedCar.id ? "warning" : "delete"}
                  </span>
                  {deleteConfirmId === selectedCar.id
                    ? "Naozaj zmazať?"
                    : "Odstrániť"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Garage;
