import React, { useState } from 'react';

const AjudaModal = ({ isOpen, onClose, isAdmin }) => {
    const [abaAtiva, setAbaAtiva] = useState('dirigente'); // 'dirigente' ou 'admin'

    if (!isOpen) return null;

    const ConteudoDirigente = () => (
        <div className="space-y-4 text-slate-700">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <h4 className="font-bold text-blue-800 flex items-center gap-2">
                    🗺️ O Mapa
                </h4>
                <p className="text-sm mt-1">
                    O mapa mostra os territórios divididos por cores:
                </p>
                <ul className="text-sm list-disc list-inside mt-2 space-y-1 ml-1 text-slate-600">
                    <li><span className="font-bold text-blue-600">Azul:</span> Território designado para você.</li>
                    <li><span className="font-bold text-green-600">Verde:</span> Território concluído recentemente.</li>
                    <li><span className="font-bold text-orange-500">Laranja/Vermelho:</span> Território parado há muito tempo.</li>
                    <li><span className="font-bold text-gray-500">Cinza:</span> Ocupado por outro dirigente.</li>
                </ul>
            </div>

            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <h4 className="font-bold text-green-800 flex items-center gap-2">
                    📍 Como trabalhar (Quadras)
                </h4>
                <p className="text-sm mt-1">
                    1. Dê <strong>zoom</strong> no mapa para ver as "bolinhas" (quadras).<br />
                    2. Toque na bolinha para marcar como <span className="text-green-600 font-bold">Feita (Verde)</span>.<br />
                    3. Toque novamente para desmarcar se errou.<br />
                    4. O sistema salva automaticamente o progresso.
                </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                    🚀 Funções Úteis
                </h4>
                <ul className="text-sm list-disc list-inside mt-2 space-y-1 text-slate-600">
                    <li><strong>Você está aqui:</strong> Clique no ícone de GPS para ver sua posição.</li>
                    <li><strong>Compartilhar:</strong> No menu do seu território, você pode enviar a localização do ponto de encontro para seu companheiro.</li>
                    <li><strong>Instalar App:</strong> No menu lateral, clique em "Instalar Aplicativo" para ter acesso rápido.</li>
                </ul>
            </div>
        </div>
    );

    const ConteudoAdmin = () => (
        <div className="space-y-4 text-slate-700">
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                <h4 className="font-bold text-purple-800 flex items-center gap-2">
                    🏷️ Designar e Devolver
                </h4>
                <p className="text-sm mt-1">
                    Clique em qualquer território no mapa:
                </p>
                <ul className="text-sm list-disc list-inside mt-2 space-y-1 ml-1 text-slate-600">
                    <li><strong>Para Designar:</strong> Selecione o nome do dirigente na lista e clique em <span className="text-blue-600 font-bold">"Salvar Designação"</span>.</li>
                    <li><strong>Para Devolver:</strong> Selecione a opção <em>"-- Devolver (Livre) --"</em> e clique em <span className="text-red-500 font-bold">"Confirmar Devolução"</span>.</li>
                    <li>O sistema disponibiliza um link de WhatsApp para ser enviado ao dirigente designado.</li>
                </ul>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                <h4 className="font-bold text-yellow-800 flex items-center gap-2">
                    📊 Relatórios e Gestão
                </h4>
                <p className="text-sm mt-1">
                    Acesse pelo Menu Lateral:
                </p>
                <ul className="text-sm list-disc list-inside mt-2 space-y-1 text-slate-600">
                    <li><strong>Relatórios:</strong> Veja quais territórios estão parados há mais de 4 meses (críticos), filtre por status e exporte PDF para o quadro de anúncios.</li>
                    <li><strong>Gerenciar Usuários:</strong> Aprove novos cadastros, bloqueie acessos ou promova irmãos a Administradores.</li>
                </ul>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <h4 className="font-bold text-gray-800 flex items-center gap-2">
                    🔄 Dicas de Manutenção
                </h4>
                <p className="text-sm mt-1">
                    Sempre que uma nova versão do sistema for lançada, o aplicativo avisará e atualizará automaticamente para garantir que todos vejam os mesmos dados.
                </p>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col animate-fade-in overflow-hidden" onClick={e => e.stopPropagation()}>

                {/* CABEÇALHO */}
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                        <span className="text-2xl">🎓</span> Central de Ajuda
                    </h3>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition-colors font-bold">
                        ✕
                    </button>
                </div>

                {/* ABAS (SÓ PARA ADMIN) */}
                {isAdmin && (
                    <div className="flex border-b border-gray-200 bg-gray-50">
                        <button
                            onClick={() => setAbaAtiva('dirigente')}
                            className={`flex-1 py-3 text-sm font-bold transition-colors ${abaAtiva === 'dirigente' ? 'bg-white text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Guia do Dirigente
                        </button>
                        <button
                            onClick={() => setAbaAtiva('admin')}
                            className={`flex-1 py-3 text-sm font-bold transition-colors ${abaAtiva === 'admin' ? 'bg-white text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Guia do Admin
                        </button>
                    </div>
                )}

                {/* CONTEÚDO COM SCROLL */}
                <div className="p-5 overflow-y-auto custom-scrollbar">
                    {isAdmin ? (
                        abaAtiva === 'dirigente' ? <ConteudoDirigente /> : <ConteudoAdmin />
                    ) : (
                        <ConteudoDirigente />
                    )}
                </div>

                {/* RODAPÉ */}
                <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                    <button onClick={onClose} className="w-full bg-slate-800 text-white font-bold py-2.5 rounded-lg hover:bg-slate-900 transition-transform active:scale-95 shadow-md">
                        Entendi, vamos trabalhar!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AjudaModal;