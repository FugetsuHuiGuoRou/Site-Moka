// # Mapa com categorias e comandos de exemplo da Moka.
const commandData = {
	// # Categoria de moderação para controle do servidor.
	mod: [
		"!ban @usuario motivo",
		"!mute @usuario 10m",
		"!clear 50",
		"!warn @usuario motivo"
	],
	// # Categoria de diversão para engajamento.
	fun: [
		"!meme",
		"!ship @user1 @user2",
		"!8ball pergunta",
		"!quiz iniciar"
	],
	// # Categoria de utilidades para recursos práticos.
	util: [
		"!server",
		"!userinfo @usuario",
		"!ping",
		"!help"
	]
};

// # Seleciona botões e saída da home.
const homeTabButtons = document.querySelectorAll(".tab-btn");
const homeOutput = document.getElementById("commandOutput");

// # Seleciona botões e saída da página de comandos.
const pageFilterButtons = document.querySelectorAll(".doc-filter-btn");
const pageOutput = document.getElementById("commandsPageOutput");

// # Função que desenha no HTML os comandos da categoria selecionada.
function renderCommands(category, outputElement) {
	// # Se não houver área de saída na página atual, evita erro.
	if (!outputElement) return;

	// # Busca lista de comandos da categoria; se não existir, usa lista vazia.
	const commands = commandData[category] || [];
	// # Converte cada comando em uma linha visual com estilo de terminal.
	outputElement.innerHTML = commands
		.map((command) => `<div>▶ ${command}</div>`)
		.join("");
}

// # Ativa interação das abas da home quando estiver na página inicial.
if (homeTabButtons.length > 0 && homeOutput) {
	homeTabButtons.forEach((button) => {
		button.addEventListener("click", () => {
			homeTabButtons.forEach((btn) => btn.classList.remove("is-active"));
			button.classList.add("is-active");
			const category = button.dataset.category;
			renderCommands(category, homeOutput);
		});
	});

	// # Renderização inicial da home.
	renderCommands("mod", homeOutput);
}

// # Ativa interação da página de comandos quando estiver nela.
if (pageFilterButtons.length > 0 && pageOutput) {
	pageFilterButtons.forEach((button) => {
		button.addEventListener("click", () => {
			pageFilterButtons.forEach((btn) => btn.classList.remove("is-active"));
			button.classList.add("is-active");
			const category = button.dataset.filter;
			renderCommands(category, pageOutput);
		});
	});

	// # Renderização inicial da página de comandos.
	renderCommands("mod", pageOutput);
}
