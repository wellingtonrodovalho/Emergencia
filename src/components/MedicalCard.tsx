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

interface MedicationItem {
  brand: string;
  activeIngredientPt: string;
  activeIngredientEn: string;
}

interface EmergencyCardData {
  fullName: string;
  sexPt: string;
  sexEn: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthDatePt: string;
  birthDateEn: string;
  birthPlace: string;
  phoneDisplay: string;
  phoneDial: string;
  cityState: string;
  weightPt: string;
  weightEn: string;
  heightPt: string;
  heightEn: string;
  healthPlanName: string;
  healthPlanNumber: string;
  nationalityPt: string;
  nationalityEn: string;
  allergiesPt: string;
  allergiesEn: string;
  bloodType: string;
  medications: MedicationItem[];
  conditionsPt: string[];
  conditionsEn: string[];
  emergencyContacts: EmergencyContact[];
}

const EMERGENCY_CARD: EmergencyCardData = {
  fullName: 'Wellington Rodovalho Fonseca',
  sexPt: 'Masculino',
  sexEn: 'Male',
  birthYear: 1969,
  birthMonth: 3,
  birthDay: 29,
  birthDatePt: '29/03/1969',
  birthDateEn: 'March 29, 1969',
  birthPlace: 'Anápolis/GO',
  phoneDisplay: '+55 (62) 98545-1980',
  phoneDial: '+5562985451980',
  cityState: 'Goiânia/GO',
  weightPt: '75 kg',
  weightEn: '165 lbs',
  heightPt: '1,65 m',
  heightEn: `5'5"`,
  healthPlanName: 'Unimed',
  healthPlanNumber: '00640924002099009',
  nationalityPt: 'Brasileira',
  nationalityEn: 'Brazilian',
  allergiesPt: 'Não',
  allergiesEn: 'None',
  bloodType: 'A+',
  medications: [
    {
      brand: 'Aradois',
      activeIngredientPt: 'Losartana potássica',
      activeIngredientEn: 'Losartan potassium',
    },
    {
      brand: 'Xigduo',
      activeIngredientPt: 'Dapagliflozina + Cloridrato de metformina',
      activeIngredientEn: 'Dapagliflozin + Metformin HCl',
    },
    {
      brand: 'Linadib Duo',
      activeIngredientPt: 'Linagliptina + Cloridrato de metformina',
      activeIngredientEn: 'Linagliptin + Metformin HCl',
    },
    {
      brand: 'Selozok',
      activeIngredientPt: 'Succinato de metoprolol',
      activeIngredientEn: 'Metoprolol succinate',
    },
    {
      brand: 'Zynpass',
      activeIngredientPt: 'Rosuvastatina cálcica',
      activeIngredientEn: 'Rosuvastatin calcium',
    },
  ],
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

function calculateAge(year: number, month: number, day: number): number {
  const today = new Date();
  let age = today.getFullYear() - year;
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  if (currentMonth < month || (currentMonth === month && currentDay < day)) {
    age -= 1;
  }
  return age;
}

const EMERGENCY_SERVICES = {
  brazil: [
    { number: '192', labelPt: 'SAMU', labelEn: 'SAMU (Ambulance)' },
    { number: '193', labelPt: 'Bombeiros', labelEn: 'Fire & Rescue' },
    { number: '190', labelPt: 'Polícia', labelEn: 'Police' },
  ],
  usa: [
    {
      number: '911',
      labelPt: 'Emergência Geral (Ambulância, Polícia e Bombeiros)',
      labelEn: 'Emergency (Ambulance, Police & Fire)',
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
  const sex = isPt ? EMERGENCY_CARD.sexPt : EMERGENCY_CARD.sexEn;
  const birthDate = isPt ? EMERGENCY_CARD.birthDatePt : EMERGENCY_CARD.birthDateEn;
  const age = calculateAge(
    EMERGENCY_CARD.birthYear,
    EMERGENCY_CARD.birthMonth,
    EMERGENCY_CARD.birthDay
  );
  const nationality = isPt ? EMERGENCY_CARD.nationalityPt : EMERGENCY_CARD.nationalityEn;
  const weight = isPt ? EMERGENCY_CARD.weightPt : EMERGENCY_CARD.weightEn;
  const height = isPt ? EMERGENCY_CARD.heightPt : EMERGENCY_CARD.heightEn;

  return (
    <>
      {/* Fixed/Sticky Top Clinical Header Bar */}
      <header className="sticky top-0 z-30 w-full bg-red-600 text-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current shrink-0"
            >
              <path d="M9.5 3h5v6.5H21v5h-6.5V21h-5v-6.5H3v-5h6.5V3z" />
            </svg>
            <span className="text-sm sm:text-base font-bold tracking-tight truncate whitespace-nowrap">
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
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8 lg:py-8 space-y-8">
        {/* Patient Identification & Clinical Summary Card */}
        <article
          aria-labelledby="emergency-card-title"
          className="w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs"
        >
          {/* Patient Identity & Blood Type */}
        <div className="px-6 sm:px-8 py-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
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
                {isPt ? 'Sexo:' : 'Sex:'}{' '}
                <strong className="font-semibold text-slate-900">{sex}</strong>
              </span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <span>
                {isPt ? 'Nascimento:' : 'Date of Birth:'}{' '}
                <strong className="font-semibold text-slate-900 tabular-nums">{birthDate}</strong>
              </span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <span>
                {isPt ? 'Idade:' : 'Age:'}{' '}
                <strong className="font-semibold text-slate-900 tabular-nums">
                  {age} {isPt ? 'anos' : 'years'}
                </strong>
              </span>
              <span aria-hidden="true" className="text-slate-300">
                ·
              </span>
              <span>
                {isPt ? 'Natural de:' : 'Place of Birth:'}{' '}
                <strong className="font-semibold text-slate-900">
                  {EMERGENCY_CARD.birthPlace}
                </strong>
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
                {isPt ? 'Cidade Atual:' : 'Current City:'}{' '}
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

        {/* Health Insurance, Drug Allergies & Biometrics */}
        <div className="px-6 sm:px-8 py-6 grid grid-cols-2 md:grid-cols-12 gap-6">
          <div className="col-span-2 md:col-span-5">
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
                aria-label={
                  isPt ? 'Copiar número do plano de saúde' : 'Copy health insurance number'
                }
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

          <div className="col-span-2 sm:col-span-1 md:col-span-3">
            <p className="text-xs font-medium text-slate-500">
              {isPt ? 'Alergia a Medicamentos' : 'Drug Allergies'}
            </p>
            <p className="mt-2 text-lg sm:text-xl font-semibold text-slate-900">{allergies}</p>
          </div>

          <div className="col-span-1 md:col-span-2">
            <p className="text-xs font-medium text-slate-500">{isPt ? 'Peso' : 'Weight'}</p>
            <p className="mt-2 text-lg sm:text-xl font-semibold text-slate-900 font-mono tabular-nums">
              {weight}
            </p>
          </div>

          <div className="col-span-1 md:col-span-2">
            <p className="text-xs font-medium text-slate-500">{isPt ? 'Altura' : 'Height'}</p>
            <p className="mt-2 text-lg sm:text-xl font-semibold text-slate-900 font-mono tabular-nums">
              {height}
            </p>
          </div>
        </div>
      </article>

      {/* Section: Medical Conditions (Cards in 2 Columns) */}
      <section aria-labelledby="conditions-heading" className="space-y-3">
        <div className="flex items-baseline justify-between px-1">
          <h2 id="conditions-heading" className="text-base font-bold text-slate-900">
            {isPt ? 'Condições Médicas / Doenças' : 'Medical Conditions'}
          </h2>
          <span className="text-xs text-slate-500 tabular-nums">
            {conditions.length} {isPt ? 'condições' : 'conditions'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conditions.map((condition) => (
            <div
              key={condition}
              className="bg-white border border-slate-200 rounded-2xl px-6 py-5 shadow-xs flex items-center justify-between gap-4"
            >
              <span className="text-lg font-bold text-slate-900">{condition}</span>
              <span className="text-xs font-medium text-red-700 whitespace-nowrap shrink-0">
                {isPt ? 'Atenção clínica' : 'Clinical alert'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Continuous Medications (Cards in 2 Columns) */}
      <section aria-labelledby="medications-heading" className="space-y-3">
        <div className="flex items-baseline justify-between px-1">
          <h2 id="medications-heading" className="text-base font-bold text-slate-900">
            {isPt
              ? 'Medicações de Uso Contínuo e Princípio Ativo'
              : 'Continuous Medications & Active Ingredients'}
          </h2>
          <span className="text-xs text-slate-500 tabular-nums">
            {EMERGENCY_CARD.medications.length} {isPt ? 'medicações' : 'medications'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EMERGENCY_CARD.medications.map((med) => (
            <div
              key={med.brand}
              className="bg-white border border-slate-200 rounded-2xl px-6 py-5 shadow-xs"
            >
              <h3 className="text-lg font-bold text-slate-900">{med.brand}</h3>
              <p className="mt-1 text-xs font-medium text-slate-500">
                {isPt ? 'Princípio ativo' : 'Active ingredient'}
              </p>
              <p className="mt-0.5 text-sm font-medium text-slate-800">
                {isPt ? med.activeIngredientPt : med.activeIngredientEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Emergency Contacts (Cards in 2 Columns) */}
      <section aria-labelledby="contacts-heading" className="space-y-3">
        <div className="flex items-baseline justify-between px-1">
          <h2 id="contacts-heading" className="text-base font-bold text-slate-900">
            {isPt ? 'Contatos de Emergência' : 'Emergency Contacts'}
          </h2>
          <span className="text-xs text-slate-500 tabular-nums">
            {EMERGENCY_CARD.emergencyContacts.length} {isPt ? 'contatos' : 'contacts'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {EMERGENCY_CARD.emergencyContacts.map((contact) => {
            const relation = isPt ? contact.relationPt : contact.relationEn;
            const copyId = `phone-${contact.id}`;
            const firstName = contact.name.split(' ')[0];

            return (
              <div
                key={contact.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-lg font-bold text-slate-900">{contact.name}</h3>
                    <span className="text-xs font-medium text-slate-500">{relation}</span>
                  </div>
                  <a
                    href={`tel:${contact.phoneDial}`}
                    className="mt-1.5 inline-flex items-center gap-2 font-mono text-base font-semibold text-red-700 hover:text-red-800 underline underline-offset-4 decoration-red-300 hover:decoration-red-700 tabular-nums transition-colors"
                  >
                    <Phone className="w-4 h-4 shrink-0" />
                    {contact.phoneDisplay}
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:${contact.phoneDial}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 active:scale-[0.99] transition-all whitespace-nowrap shrink-0"
                  >
                    <Phone className="w-4 h-4" />
                    {isPt ? `Ligar (${firstName})` : `Call ${firstName}`}
                  </a>

                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 text-sm font-semibold text-slate-900 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                    WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={() => void handleCopy(contact.phoneDisplay, copyId)}
                    aria-label={
                      isPt
                        ? `Copiar telefone de ${contact.name}`
                        : `Copy ${contact.name}'s phone number`
                    }
                    className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors shrink-0 cursor-pointer"
                  >
                    {copiedKey === copyId ? (
                      <Check className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section: Public Emergency Numbers — Brazil & USA (Cards in 2 Columns) */}
      <section aria-labelledby="services-heading" className="space-y-3">
        <h2 id="services-heading" className="text-base font-bold text-slate-900 px-1">
          {isPt
            ? 'Telefones de Emergência — Brasil e EUA'
            : 'Emergency Service Numbers — Brazil & USA'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900">{isPt ? 'Brasil' : 'Brazil'}</h3>
            <div className="grid grid-cols-3 gap-2.5">
              {EMERGENCY_SERVICES.brazil.map((svc) => (
                <a
                  key={svc.number}
                  href={`tel:${svc.number}`}
                  className="flex flex-col items-center justify-center min-h-[60px] px-2 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-red-50 hover:border-red-200 transition-colors text-center"
                >
                  <span className="font-mono font-bold text-base text-red-700 tabular-nums">
                    {svc.number}
                  </span>
                  <span className="text-xs font-medium text-slate-700 truncate max-w-full">
                    {isPt ? svc.labelPt : svc.labelEn}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              {isPt ? 'Estados Unidos (EUA)' : 'United States (USA)'}
            </h3>
            {EMERGENCY_SERVICES.usa.map((svc) => (
              <a
                key={svc.number}
                href={`tel:${svc.number}`}
                className="w-full inline-flex items-center justify-center gap-2.5 min-h-[60px] px-4 py-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 transition-colors"
              >
                <Phone className="w-4 h-4 text-red-700 shrink-0" />
                <span className="font-mono font-bold text-lg text-red-700 tabular-nums">
                  {svc.number}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-800">
                  {isPt ? svc.labelPt : svc.labelEn}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      </main>
    </>
  );
};
