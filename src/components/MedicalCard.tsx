import React, { useState } from 'react';
import { Check, Copy, MessageCircle, Phone } from 'lucide-react';

interface EmergencyContact {
  id: string;
  name: string;
  relationPt: string;
  relationEn: string;
  phoneDisplay: string;
  phoneDial: string;
  whatsapp: string;
}

interface EmergencyCardData {
  fullName: string;
  birthDatePt: string;
  birthDateEn: string;
  phoneDisplay: string;
  phoneDial: string;
  cityState: string;
  healthPlanName: string;
  healthPlanNumber: string;
  nationalityPt: string;
  nationalityEn: string;
  allergiesPt: string;
  allergiesEn: string;
  bloodType: string;
  medications: string[];
  conditionsPt: string[];
  conditionsEn: string[];
  emergencyContacts: EmergencyContact[];
}

const EMERGENCY_CARD: EmergencyCardData = {
  fullName: 'Wellington Rodovalho Fonseca',
  birthDatePt: '29/03/1969',
  birthDateEn: 'March 29, 1969',
  phoneDisplay: '+55 (62) 98545-1980',
  phoneDial: '+5562985451980',
  cityState: 'Goiânia/GO',
  healthPlanName: 'Unimed',
  healthPlanNumber: '00640924002099009',
  nationalityPt: 'Brasileira',
  nationalityEn: 'Brazilian',
  allergiesPt: 'Não',
  allergiesEn: 'None',
  bloodType: 'A+',
  medications: ['Aradois', 'Xigduo', 'Linadib Duo', 'Selozok', 'Zynpass'],
  conditionsPt: ['Diabetes', 'Hipertensão', 'Cardiopatia'],
  conditionsEn: ['Diabetes', 'Hypertension', 'Heart Disease'],
  emergencyContacts: [
    {
      id: 'neila',
      name: 'Neila',
      relationPt: 'Irmã',
      relationEn: 'Sister',
      phoneDisplay: '+55 (62) 98415-4912',
      phoneDial: '+5562984154912',
      whatsapp: '5562984154912',
    },
    {
      id: 'keyla',
      name: 'Keyla Fonseca',
      relationPt: 'Esposa',
      relationEn: 'Wife',
      phoneDisplay: '+55 (62) 98456-2160',
      phoneDial: '+5562984562160',
      whatsapp: '5562984562160',
    },
    {
      id: 'wesley',
      name: 'Wesley Vilela',
      relationPt: 'Irmão',
      relationEn: 'Brother',
      phoneDisplay: '+55 (62) 98136-4888',
      phoneDial: '+5562981364888',
      whatsapp: '5562981364888',
    },
  ],
};

export const MedicalCard: React.FC = () => {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const isPt = lang === 'pt';

  const handleCopy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((current) => (current === key ? null : current));
      }, 2000);
    } catch {
      // Ignore clipboard error if unavailable
    }
  };

  const conditions = isPt ? EMERGENCY_CARD.conditionsPt : EMERGENCY_CARD.conditionsEn;
  const allergies = isPt ? EMERGENCY_CARD.allergiesPt : EMERGENCY_CARD.allergiesEn;
  const birthDate = isPt ? EMERGENCY_CARD.birthDatePt : EMERGENCY_CARD.birthDateEn;
  const nationality = isPt ? EMERGENCY_CARD.nationalityPt : EMERGENCY_CARD.nationalityEn;

  return (
    <article
      aria-labelledby="emergency-card-title"
      className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs"
    >
      {/* Top Clinical Strip */}
      <div className="bg-red-600 text-white px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="w-5 h-5 fill-current shrink-0"
          >
            <path d="M9.5 3h5v6.5H21v5h-6.5V21h-5v-6.5H3v-5h6.5V3z" />
          </svg>
          <span className="text-sm sm:text-base font-bold tracking-tight">
            {isPt ? 'Cartão de Emergência' : 'Emergency Card'}
          </span>
        </div>

        <div
          role="group"
          aria-label={isPt ? 'Selecionar idioma' : 'Select language'}
          className="inline-flex items-center p-0.5 bg-red-700/80 rounded-lg shrink-0"
        >
          <button
            type="button"
            onClick={() => setLang('pt')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isPt ? 'bg-white text-red-700' : 'text-red-100 hover:text-white'
            }`}
          >
            Português
          </button>
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              !isPt ? 'bg-white text-red-700' : 'text-red-100 hover:text-white'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Patient Identity & Blood Type */}
      <div className="px-6 sm:px-8 py-7 border-b border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-xs font-medium text-slate-500">
            {isPt ? 'Nome Completo' : 'Full Name'}
          </p>
          <h1
            id="emergency-card-title"
            className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]"
          >
            {EMERGENCY_CARD.fullName}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1 text-sm text-slate-600">
            <span>
              {isPt ? 'Data de Nascimento:' : 'Date of Birth:'}{' '}
              <strong className="font-semibold text-slate-900 tabular-nums">{birthDate}</strong>
            </span>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span>
              {isPt ? 'Nacionalidade:' : 'Nationality:'}{' '}
              <strong className="font-semibold text-slate-900">{nationality}</strong>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-slate-600">
            <span>
              {isPt ? 'Cidade:' : 'City:'}{' '}
              <strong className="font-semibold text-slate-900">{EMERGENCY_CARD.cityState}</strong>
            </span>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              {isPt ? 'Telefone:' : 'Phone:'}{' '}
              <a
                href={`tel:${EMERGENCY_CARD.phoneDial}`}
                className="font-mono font-semibold text-slate-900 hover:text-red-700 underline underline-offset-4 decoration-slate-300 hover:decoration-red-600 tabular-nums transition-colors"
              >
                {EMERGENCY_CARD.phoneDisplay}
              </a>
            </span>
          </div>
        </div>

        <div className="sm:text-right shrink-0">
          <p className="text-xs font-medium text-slate-500">
            {isPt ? 'Tipo Sanguíneo' : 'Blood Type'}
          </p>
          <p className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight text-red-600 font-mono tabular-nums">
            {EMERGENCY_CARD.bloodType}
          </p>
        </div>
      </div>

      {/* Health Insurance & Drug Allergies */}
      <div className="px-6 sm:px-8 py-6 border-b border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div>
          <p className="text-xs font-medium text-slate-500">
            {isPt
              ? `Plano de Saúde (${EMERGENCY_CARD.healthPlanName})`
              : `Health Insurance (${EMERGENCY_CARD.healthPlanName})`}
          </p>
          <div className="mt-2 flex items-center gap-2.5">
            <span className="font-mono text-base sm:text-lg font-semibold text-slate-900 tabular-nums break-all">
              {EMERGENCY_CARD.healthPlanNumber}
            </span>
            <button
              type="button"
              onClick={() => void handleCopy(EMERGENCY_CARD.healthPlanNumber, 'plan')}
              aria-label={isPt ? 'Copiar número do plano de saúde' : 'Copy health insurance number'}
              className="inline-flex items-center justify-center min-w-[40px] min-h-[40px] rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
            >
              {copiedKey === 'plan' ? (
                <Check className="w-4 h-4 text-emerald-700" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500">
            {isPt ? 'Alergia a Medicamentos' : 'Drug Allergies'}
          </p>
          <p className="mt-2 text-lg sm:text-xl font-semibold text-slate-900">{allergies}</p>
        </div>
      </div>

      {/* Medical Conditions & Continuous Medications */}
      <div className="px-6 sm:px-8 py-6 border-b border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        <div>
          <h2 className="text-xs font-semibold text-slate-500">
            {isPt ? 'Condições Médicas / Doenças' : 'Medical Conditions'}
          </h2>
          <ul className="mt-3 divide-y divide-slate-100">
            {conditions.map((condition) => (
              <li key={condition} className="py-2.5 text-base font-semibold text-slate-900">
                {condition}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-slate-500">
            {isPt ? 'Medicações de Uso Contínuo' : 'Continuous Medications'}
          </h2>
          <ul className="mt-3 divide-y divide-slate-100">
            {EMERGENCY_CARD.medications.map((medication) => (
              <li key={medication} className="py-2.5 text-base font-medium text-slate-800">
                {medication}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Emergency Contacts Section */}
      <div className="px-6 sm:px-8 py-7 bg-slate-50/70">
        <p className="text-xs font-semibold text-red-700 mb-2">
          {isPt ? 'Contatos de Emergência' : 'Emergency Contacts'}
        </p>

        <ul className="divide-y divide-slate-200">
          {EMERGENCY_CARD.emergencyContacts.map((contact) => {
            const relation = isPt ? contact.relationPt : contact.relationEn;
            const copyId = `phone-${contact.id}`;
            const firstName = contact.name.split(' ')[0];

            return (
              <li
                key={contact.id}
                className="py-5 first:pt-2 last:pb-0 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div>
                  <p className="text-lg sm:text-xl font-bold text-slate-900">
                    {contact.name}{' '}
                    <span className="font-normal text-slate-500">({relation})</span>
                  </p>
                  <a
                    href={`tel:${contact.phoneDial}`}
                    className="mt-1 inline-flex items-center gap-2 font-mono text-base sm:text-lg font-semibold text-red-700 hover:text-red-800 underline underline-offset-4 decoration-red-300 hover:decoration-red-700 tabular-nums transition-colors"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    {contact.phoneDisplay}
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={`tel:${contact.phoneDial}`}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 active:scale-[0.99] transition-all whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-4 h-4" />
                    {isPt ? `Ligar para ${firstName}` : `Call ${firstName}`}
                  </a>

                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                    WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={() => void handleCopy(contact.phoneDisplay, copyId)}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-3.5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedKey === copyId ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-700" />
                        {isPt ? 'Copiado' : 'Copied'}
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        {isPt ? 'Copiar' : 'Copy'}
                      </>
                    )}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
};
