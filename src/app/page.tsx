"use client";

import Image from "next/image";
import React, { useState } from "react";
import imageLogo from "../../public/luma-logo-icon.svg";

interface IFormInterface {
  nombre: string;
  telefono?: string;
  calificacion: number;
  aspectos: string[];
  deseaPromociones: boolean | null;
}

export default function Home() {
  const [formData, setFormData] = useState<IFormInterface>({
    nombre: "",
    telefono: "",
    calificacion: 3,
    aspectos: [],
    deseaPromociones: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, calificacion: Number(e.target.value) }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      aspectos: checked
        ? [...prev.aspectos, name]
        : prev.aspectos.filter((item) => item !== name),
    }));
  };

  const handlePromocionesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "si";
    setFormData((prev) => ({
      ...prev,
      deseaPromociones: value,
      telefono: value ? prev.telefono : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.telefono || formData.telefono.length !== 10) {
      alert("El número de teléfono debe tener exactamente 10 dígitos.");
      return;
    }
    try {
      // 1️⃣ Verificar si el número ya existe en la base de datos
      const checkResponse = await fetch(
        `/api/verificar-telefono?telefono=${formData.telefono}`
      );
      const { exists } = await checkResponse.json();

      if (exists) {
        alert("El número de teléfono ya está registrado, agrega otro.");
        return;
      }

      // 2️⃣ Si no existe, enviar el formulario
      const response = await fetch("/api/repuesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error al enviar formulario");

      console.log("✅ Formulario enviado con éxito!");
      alert("✅ Formulario enviado con éxito!");

      setFormData({
        nombre: "",
        telefono: "",
        calificacion: 3,
        aspectos: [],
        deseaPromociones: null,
      });
    } catch (error) {
      console.error("❌ Error inesperado:", error);
    }
  };

  return (
    <main className="flex  justify-center bg-primary min-h-screen">
      <div className=" p-8 w-full max-w-lg ">
        <div className="flex justify-center items-center overflow-hidden w-full h-36">
          <Image
            priority
            src={imageLogo}
            width={100}
            height={100}
            alt="Logo"
            className="w-full aspect-square"
          />
        </div>
        {/* <h1 className="text-3xl font-bold text-[#260801] text-center font-primary">Lume</h1>
        <h2 className="text-lg text-[#8C634A] text-center mb-6">El sabor que enciende tus sentidos</h2> */}
        <h2 className="text-xl text-[#8C634A] text-center mb-6">Formulario</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">Nombre:</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2  rounded-lg outline-none focus:shadow focus:shadow-secondary  "
            required
          />

          <label className="flex flex-row justify-center ">
            Calificación (<p className="text-secondary">
            {formData.calificacion}
            </p>)
          </label>
          <input
            type="range"
            name="calificacion"
            min="1"
            max="5"
            value={formData.calificacion}
            onChange={handleRangeChange}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary bg-secondary shadow shadow-secondary"
            style={{
              WebkitAppearance: "none",
            }}
          />

          <label className="block">¿Qué fue lo que más te gustó?</label>
          {["sabor", "dulzura", "textura", "presentacion"].map((item) => (
            <label
              key={item}
              className="flex items-center gap-3 cursor-pointer"
            >
              {/* Checkbox oculto */}
              <input
                type="checkbox"
                name={item}
                checked={formData.aspectos.includes(item)}
                onChange={handleCheckboxChange}
                className="peer hidden"
              />

              {/* Estilo del checkbox personalizado */}
              <div className="w-6 h-6 flex items-center justify-center border-2 border-secondary rounded-md peer-checked:bg-secondary peer-checked:border-primary transition-all">
                <svg
                  className="hidden peer-checked:block w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M20.292 5.292a1 1 0 0 1 1.416 1.416l-11 11a1 1 0 0 1-1.416 0l-5-5a1 1 0 0 1 1.416-1.416L10 15.086l10.292-10.294z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* Texto del checkbox */}
              <span className="text-gray-800 peer-checked:text-secondary font-medium">
                {item}
              </span>
            </label>
          ))}

          <label className="block pb-4">
            ¿Te gustaría recibir promociones?
          </label>

          <div className="flex flex-row gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="deseaPromociones"
                value="si"
                checked={formData.deseaPromociones === true}
                onChange={handlePromocionesChange}
                className="peer hidden"
              />
              <div className="w-6 h-6 flex items-center justify-center border-2 border-secondary rounded-full peer-checked:border-secondary peer-checked:bg-secondary transition-all">
                <div className="w-3 h-3 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-all"></div>
              </div>
              <span className="text-gray-800 peer-checked:text-secondary font-medium">
                Sí
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="deseaPromociones"
                value="no"
                checked={formData.deseaPromociones === false}
                onChange={handlePromocionesChange}
                className="peer hidden"
              />
              <div className="w-6 h-6 flex items-center justify-center border-2 border-secondary rounded-full peer-checked:border-secondary peer-checked:bg-secondary transition-all">
                <div className="w-3 h-3 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-all"></div>
              </div>
              <span className="text-gray-800 peer-checked:text-secondary font-medium">
                No
              </span>
            </label>
          </div>

          {formData.deseaPromociones && (
            <input
              type="tel"
              name="telefono"
              placeholder="Número de WhatsApp"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-2  rounded-lg outline-none focus:shadow focus:shadow-secondary  "
              required
            />
          )}

          <button
            type="submit"
            className="w-full shadow-md text-primary font-bold py-2 px-4 rounded-lg bg-secondary butto-submit "
          >
            Enviar formulario
          </button>
        </form>
      </div>
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: radial-gradient(
            circle,
            var(--bg-primary) 40%,
            var(--bg-secondary) 120%
          );

          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.2);
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background-color: #ffe156;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </main>
  );
}
