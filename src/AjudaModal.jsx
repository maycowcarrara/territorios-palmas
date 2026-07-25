import React, { useMemo, useState } from 'react';
import { ModalFrame } from './uiPrimitives';
import { buttonClass } from './uiClasses';

const TABS_BASE = [
    { id: 'primeiros-passos', label: 'Primeiros passos' },
    { id: 'ferramentas', label: 'Ferramentas' },
    { id: 'documentos', label: 'Documentos' }
];

const FLOW_STEPS = [
    {
        title: 'Abra seu território',
        description: 'Entre no mapa, localize a área designada e use "Meus" para achar rapidamente os territórios que estão com você.'
    },
    {
        title: 'Marque o andamento',
        description: 'Toque na bolinha com o número da quadra para alternar entre não feito e feito.'
    },
    {
        title: 'Anote e compartilhe',
        description: 'Registre observações por quadra e use "Ponto de Encontro" quando precisar enviar um local no WhatsApp.'
    }
];

const QUADRA_STATUS = [
    { label: 'Não feito', colors: 'bg-red-500 border-red-700' },
    { label: 'Feito', colors: 'bg-green-500 border-green-700' }
];

const TOOL_ITEMS = [
    {
        badge: (
            <div className="bg-gray-100 p-1.5 rounded text-gray-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            </div>
        ),
        title: 'Ver ruas sem as cores do mapa',
        description: 'Use o botão de olho no canto superior direito para esconder as cores e ler melhor os nomes das ruas.'
    },
    {
        badge: <div className="bg-blue-100 p-1.5 rounded text-blue-600 mt-0.5 font-bold text-xs w-7 h-7 flex items-center justify-center">Meus</div>,
        title: 'Achar seus territórios mais rápido',
        description: 'No topo da tela, toque em "Meus" para ver a lista rápida de todos os territórios que estão com você.'
    },
    {
        badge: (
            <div className="bg-green-100 p-1.5 rounded text-green-600 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
            </div>
        ),
        title: 'Compartilhar ponto de encontro',
        description: 'Toque no local desejado dentro do território, abra o popup e use "Ponto de Encontro" para enviar aquele ponto no WhatsApp.'
    }
];

const DOCUMENT_LINKS = [
    { href: '/privacy-policy.html', label: 'Política de Privacidade' },
    { href: '/terms-of-use.html', label: 'Termos de Uso' },
    { href: '/account-deletion.html', label: 'Exclusão de Conta' },
    { href: '/data-deletion-request.html', label: 'Exclusão de Dados' }
];

function TabButton({ active, label, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors ${
                active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:text-blue-700'
            }`}
        >
            {label}
        </button>
    );
}

function InfoCard({ tone = 'gray', title, description, children }) {
    const tones = {
        blue: 'bg-blue-50 border-blue-200',
        violet: 'bg-violet-50 border-violet-200',
        amber: 'bg-amber-50 border-amber-200',
        gray: 'bg-gray-50 border-gray-200',
        sky: 'bg-sky-50 border-sky-200'
    };

    return (
        <section className={`rounded-xl border p-3 sm:p-4 ${tones[tone] || tones.gray}`}>
            <h4 className="text-sm font-bold text-gray-900">{title}</h4>
            {description ? <p className="mt-1 text-sm text-gray-700">{description}</p> : null}
            {children ? <div className="mt-3">{children}</div> : null}
        </section>
    );
}

const AjudaModal = ({ isOpen, onClose }) => {
    const tabs = useMemo(() => TABS_BASE, []);
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    if (!isOpen) return null;

    return (
        <ModalFrame
            isOpen={isOpen}
            onClose={onClose}
            title="Como usar o mapa"
            subtitle="Tudo o que você precisa para trabalhar no território sem se perder na tela."
            size="lg"
            accentClass="bg-blue-600"
            bodyClassName="flex min-h-0 flex-col overflow-hidden p-0"
            titleIcon={(
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )}
            footer={(
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className={buttonClass('primary', 'px-6')}
                    >
                        Entendi, vamos lá!
                    </button>
                </div>
            )}
        >
                <div className="border-b border-gray-100 bg-gray-50 px-3 py-2.5 shrink-0">
                    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {tabs.map((tab) => (
                            <TabButton
                                key={tab.id}
                                label={tab.label}
                                active={activeTab === tab.id}
                                onClick={() => setActiveTab(tab.id)}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto p-4">
                    {activeTab === 'primeiros-passos' ? (
                        <div className="space-y-4">
                            <InfoCard
                                tone="blue"
                                title="Fluxo rápido"
                                description="Se estiver começando agora, faça assim."
                            >
                                <div className="space-y-2.5">
                                    {FLOW_STEPS.map((step, index) => (
                                        <div key={step.title} className="flex items-start gap-3 rounded-xl bg-white p-3 border border-blue-100 shadow-sm">
                                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{step.title}</p>
                                                <p className="mt-0.5 text-sm text-gray-600">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </InfoCard>

                            <div className="grid gap-3 sm:grid-cols-2">
                                <InfoCard
                                    tone="violet"
                                    title="Modo campanha"
                                    description="O topo muda de cor e mostra a cobertura da campanha separada da pregação normal."
                                />

                                <InfoCard
                                    title="Marcar quadras"
                                    description="Toque na bolinha da quadra para alternar o status."
                                >
                                    <div className="flex flex-wrap gap-4">
                                        {QUADRA_STATUS.map((status) => (
                                            <div key={status.label} className="flex items-center gap-2">
                                                <div className={`w-4 h-4 rounded-full border ${status.colors}`}></div>
                                                <span className="text-xs font-bold text-gray-600">{status.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </InfoCard>
                            </div>

                            <InfoCard
                                tone="sky"
                                title="Atalhos rápidos"
                                description="Dois recursos que ajudam bastante no dia a dia."
                            >
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-xl border border-sky-100 bg-white p-3 shadow-sm">
                                        <p className="text-sm font-bold text-gray-900">GPS</p>
                                        <p className="mt-1 text-sm text-gray-600">Centraliza sua posição no mapa.</p>
                                    </div>
                                    <div className="rounded-xl border border-sky-100 bg-white p-3 shadow-sm">
                                        <p className="text-sm font-bold text-gray-900">Olho</p>
                                        <p className="mt-1 text-sm text-gray-600">Esconde as cores do mapa para ler melhor os nomes das ruas.</p>
                                    </div>
                                </div>
                            </InfoCard>

                            <InfoCard
                                tone="amber"
                                title="Observações nas quadras"
                                description="Use para registrar alertas e recados importantes."
                            >
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-xl border border-amber-100 bg-white p-3 shadow-sm">
                                        <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Computador</p>
                                        <p className="mt-1 text-sm font-semibold text-blue-600">Botão direito na quadra</p>
                                    </div>
                                    <div className="rounded-xl border border-amber-100 bg-white p-3 shadow-sm">
                                        <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Celular</p>
                                        <p className="mt-1 text-sm font-semibold text-blue-600">Segure o dedo na quadra</p>
                                    </div>
                                </div>
                                <p className="mt-3 text-xs text-gray-600">
                                    A bolinha amarela indica que a quadra tem anotação, e isso continua visível mesmo em campanha.
                                </p>
                            </InfoCard>
                        </div>
                    ) : null}

                    {activeTab === 'ferramentas' ? (
                        <div className="space-y-4">
                            <InfoCard
                                title="Atalhos úteis"
                                description="Esses botões aceleram bastante o uso do mapa no dia a dia."
                            >
                                <div className="space-y-4">
                                    {TOOL_ITEMS.map((item) => (
                                        <div key={item.title} className="flex gap-3 items-start rounded-xl bg-white p-3 border border-gray-100 shadow-sm">
                                            {item.badge}
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{item.title}</p>
                                                <p className="text-sm text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </InfoCard>
                        </div>
                    ) : null}

                    {activeTab === 'documentos' ? (
                        <div className="space-y-4">
                            <InfoCard
                                tone="gray"
                                title="Documentos públicos do app"
                                description="Se precisar consultar regras, privacidade ou exclusão de dados, os links ficam aqui."
                            >
                                <div className="flex flex-wrap gap-3 text-sm font-semibold">
                                    {DOCUMENT_LINKS.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            className="rounded-full border border-blue-200 bg-white px-4 py-2 text-blue-700 hover:border-blue-300 hover:text-blue-800"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </InfoCard>
                        </div>
                    ) : null}
                </div>

        </ModalFrame>
    );
};

export default AjudaModal;
