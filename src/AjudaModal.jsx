import React from 'react';

const AjudaModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh]"
                onClick={e => e.stopPropagation()}
            >
                {/* Cabeçalho */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-blue-600 text-white shrink-0">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Como usar o Mapa
                    </h3>
                    <button onClick={onClose} className="text-white/80 hover:text-white font-bold text-2xl leading-none px-2">
                        &times;
                    </button>
                </div>

                {/* Conteúdo Rolável */}
                <div className="p-6 overflow-y-auto space-y-6">

                    <section className="bg-violet-50 border border-violet-200 rounded-xl p-4">
                        <h4 className="font-bold text-violet-800 mb-2 flex items-center gap-2 text-lg">
                            <span>📢</span> Modo Campanha
                        </h4>
                        <p className="text-sm text-gray-700">
                            Quando houver uma campanha ativa, o topo do app muda de cor e mostra o nome da campanha com o percentual já coberto. Nesse modo, o andamento da campanha é separado da pregação normal.
                        </p>
                    </section>

                    <section className="bg-sky-50 border border-sky-200 rounded-xl p-4">
                        <h4 className="font-bold text-sky-800 mb-2 flex items-center gap-2 text-lg">
                            <span>📶</span> Offline e Sincronização
                        </h4>
                        <div className="space-y-2 text-sm text-gray-700">
                            <p>
                                Mesmo sem conexão, você pode continuar trabalhando no território que está com você: marcar quadras, registrar observações e concluir o território.
                            </p>
                            <p>
                                No topo da tela aparece um <strong>chip de status</strong> quando houver offline, pendências, falhas ou conflitos. Toque nele para ver os detalhes.
                            </p>
                            <p>
                                Quando a internet volta, o app sincroniza automaticamente. Se o território tiver mudado de responsável nesse meio tempo, a alteração entra como conflito e não sobrescreve a designação nova.
                            </p>
                            <p>
                                Se você confirmar a finalização enquanto estiver offline, o território será finalizado de vez assim que a conexão voltar, desde que a designação ainda seja a mesma.
                            </p>
                        </div>
                    </section>

                    <section className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2 text-lg">
                            <span>🛡️</span> Admin sem conexão
                        </h4>
                        <p className="text-sm text-gray-700">
                            Ações administrativas ficam bloqueadas offline para evitar conflito de designações. Sem conexão, o admin pode consultar dados cacheados e trabalhar normalmente apenas no território que estiver designado para ele.
                        </p>
                    </section>

                    <section className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2 text-lg">
                            <span>💬</span> Observações nas Quadras
                        </h4>
                        <p className="text-sm text-gray-700 mb-3">
                            Registre informações importantes (ex: "Cachorro bravo", "Morador da casa n° 45 pediu para não visitar...") em cada quadra.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-2">
                            <div className="bg-white p-3 rounded border border-yellow-100 shadow-sm text-center">
                                <span className="text-2xl mb-1 block">💻</span>
                                <strong className="block text-xs text-gray-500 uppercase tracking-wide">Computador</strong>
                                <p className="text-sm font-bold text-blue-600">Botão Direito</p>
                                <p className="text-xs text-gray-400">no número da quadra</p>
                            </div>
                            <div className="bg-white p-3 rounded border border-yellow-100 shadow-sm text-center">
                                <span className="text-2xl mb-1 block">📱</span>
                                <strong className="block text-xs text-gray-500 uppercase tracking-wide">Celular</strong>
                                <p className="text-sm font-bold text-blue-600">Segurar o Dedo</p>
                                <p className="text-xs text-gray-400">Toque longo</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 italic text-center mt-2">
                            * Uma bolinha amarela aparecerá nas quadras que possuem anotações.
                        </p>
                        <p className="text-xs text-gray-600 text-center mt-2">
                            Essas observações continuam visíveis mesmo quando o sistema entra em campanha.
                        </p>
                    </section>

                    <hr className="border-gray-100" />

                    <section>
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-600 p-1 rounded">🚀</span>
                            Ferramentas Úteis
                        </h4>
                        <ul className="space-y-3">
                            <li className="flex gap-3 items-start">
                                <div className="bg-gray-100 p-1.5 rounded text-gray-600 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                </div>
                                <div>
                                    <strong className="text-sm text-gray-800 block">Ver Ruas (Ocultar Cores)</strong>
                                    <p className="text-xs text-gray-600">Use o botão de <strong>Olho</strong> (canto superior direito) para esconder as cores do mapa. Isso ajuda a ler melhor os nomes das ruas.</p>
                                </div>
                            </li>

                            <li className="flex gap-3 items-start">
                                <div className="bg-blue-100 p-1.5 rounded text-blue-600 mt-0.5 font-bold text-xs w-7 h-7 flex items-center justify-center">Meus</div>
                                <div>
                                    <strong className="text-sm text-gray-800 block">Botão "Meus"</strong>
                                    <p className="text-xs text-gray-600">No topo da tela, clique em <strong>"Meus"</strong> para ver uma lista rápida de todos os territórios que estão com você no momento.</p>
                                </div>
                            </li>

                            <li className="flex gap-3 items-start">
                                <div className="bg-green-100 p-1.5 rounded text-green-600 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                </div>
                                <div>
                                    <strong className="text-sm text-gray-800 block">Ponto de Encontro</strong>
                                    <p className="text-xs text-gray-600">Toque no local desejado dentro do seu território, abra o popup do território e use <strong>Ponto de Encontro</strong> para compartilhar aquele ponto no WhatsApp.</p>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <hr className="border-gray-100" />

                    <section>
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-600 p-1 rounded">1</span>
                            Marcar Quadras
                        </h4>
                        <p className="text-sm text-gray-600 ml-8">
                            Basta <strong>clicar (ou tocar)</strong> na bolinha com o número da quadra para mudar a cor:
                        </p>
                        <div className="flex gap-4 ml-8 mt-2">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-red-500 border border-red-700"></div>
                                <span className="text-xs font-bold text-gray-600">Não Feito</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-green-500 border border-green-700"></div>
                                <span className="text-xs font-bold text-gray-600">Feito</span>
                            </div>
                        </div>
                    </section>

                    <section className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <h4 className="font-bold text-blue-800 text-sm mb-1">💡 Dica Importante</h4>
                        <p className="text-xs text-blue-700">
                            Use o botão de <strong>GPS</strong> (canto inferior direito) para centralizar onde você está.
                        </p>
                    </section>

                    <section className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <h4 className="font-bold text-gray-800 text-sm mb-2">Privacidade e documentos</h4>
                        <p className="text-xs text-gray-600 mb-3">
                            Consulte os documentos públicos do app sempre que precisar.
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs font-semibold">
                            <a href="/privacy-policy.html" className="text-blue-600 hover:text-blue-700 hover:underline">
                                Política de Privacidade
                            </a>
                            <a href="/terms-of-use.html" className="text-blue-600 hover:text-blue-700 hover:underline">
                                Termos de Uso
                            </a>
                            <a href="/account-deletion.html" className="text-blue-600 hover:text-blue-700 hover:underline">
                                Exclusão de Conta
                            </a>
                            <a href="/data-deletion-request.html" className="text-blue-600 hover:text-blue-700 hover:underline">
                                Exclusão de Dados
                            </a>
                        </div>
                    </section>

                </div>

                {/* Rodapé */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-sm transition-colors"
                    >
                        Entendi, vamos lá!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AjudaModal;
