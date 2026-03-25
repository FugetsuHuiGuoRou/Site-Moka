// # Mapa com categorias e comandos de exemplo da Moka.
const commandData = {
	// # Categoria de moderação para controle do servidor.
	mod: [
		"m!!ping | /ping - verifica a resposta do bot",
		"m!!update | /update - mostra o que veio de novo no bot",
		"m!!infoserver | /infoserver - informações do servidor",
		"m!!infouser @usuario | /infouser @usuario - dados do usuário marcado",
		"Entrada e saída - controla quem entra e sai do servidor",
		"Voz - controla quem entra e sai da call de voz",
		"Mensagens - controla quem apaga mensagens"
	],
	// # Categoria de matematica com operacoes basicas.
	math: [
		"m!!sub | /sub - subtrai",
		"m!!somar | /somar - soma",
		"m!!div | /div - divisão",
		"m!!mult | /mult - multiplicação"
	],
	// # Categoria de traducao de texto.
	trad: [
		"m!!traduzir para binário | /traduzir para binário - converte sua mensagem em código binário",
		"m!!traduzir para morse | /traduzir para morse - converte sua mensagem em código morse"
	],
	// # Categoria de diversão para engajamento.
	fun: [
		"m!!roubaravatar | /roubaravatar - pega a foto de perfil de outro usuário",
		"m!!recomendaranime | /recomendaranime - recomenda um anime aleatório",
		"m!!recomendarfilme | /recomendarfilme - recomenda um filme aleatório"
	],
	// # Categoria de mini-games para eventos e partidas rápidas.
	mini: [
		"m!!jokenpo | /jokenpo - pedra, papel ou tesoura contra outro usuário",
		"m!!coin | /coin - sorteia cara ou coroa",
		"m!!dados | /dados - gera um número aleatório de 1 a 6",
		"m!!imparpar | /imparpar - ímpar ou par contra outro usuário"
	],
	// # Categoria de saúde e utilidade para rotinas do dia a dia.
	health: [
		"m!!imc | /imc - calcula o índice de massa corporal",
		"m!!agua | /agua - calcula quantos ml de água você deve beber por dia",
		"m!!calcularsono | /calcularsono - avalia se você dormiu bem pelos ciclos de sono"
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

// # Carrossel da seção "Por que escolher Moka?" na home.
const featureTrack = document.getElementById("featureTrack");
const featurePrevBtn = document.querySelector(".feature-nav-prev");
const featureNextBtn = document.querySelector(".feature-nav-next");

if (featureTrack && featurePrevBtn && featureNextBtn) {
	const getStepSize = () => {
		const firstCard = featureTrack.querySelector(".feature-card");
		if (!firstCard) return 280;
		const cardWidth = firstCard.getBoundingClientRect().width;
		const computedStyle = window.getComputedStyle(featureTrack);
		const gap = parseFloat(computedStyle.columnGap || computedStyle.gap || "0") || 0;
		return cardWidth + gap;
	};

	featurePrevBtn.addEventListener("click", () => {
		featureTrack.scrollBy({ left: -getStepSize(), behavior: "smooth" });
	});

	featureNextBtn.addEventListener("click", () => {
		featureTrack.scrollBy({ left: getStepSize(), behavior: "smooth" });
	});

	featureTrack.addEventListener(
		"wheel",
		(event) => {
			const canScrollHorizontally = featureTrack.scrollWidth > featureTrack.clientWidth;
			if (!canScrollHorizontally) return;

			const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
			if (delta === 0) return;

			event.preventDefault();
			featureTrack.scrollBy({ left: delta, behavior: "auto" });
		},
		{ passive: false }
	);
}

// # Barra de progresso da meta da Moka (ex.: 1 / 50).
const goalWidgets = document.querySelectorAll(".goal-widget");

if (goalWidgets.length > 0) {
	goalWidgets.forEach((widget) => {
		const goalTrack = widget.querySelector(".goal-track");
		const goalFill = widget.querySelector(".goal-fill");
		const goalStatus = widget.querySelector(".goal-status");

		if (!goalTrack || !goalFill || !goalStatus) return;

		const current = Number(widget.dataset.current || "0");
		const total = Number(widget.dataset.total || "1");
		const safeTotal = total > 0 ? total : 1;
		const safeCurrent = Math.max(0, Math.min(current, safeTotal));
		const percent = (safeCurrent / safeTotal) * 100;

		goalFill.style.width = `${percent}%`;
		goalStatus.textContent = `${safeCurrent} / ${safeTotal} servidores`;
		goalTrack.setAttribute("aria-valuemin", "0");
		goalTrack.setAttribute("aria-valuemax", String(safeTotal));
		goalTrack.setAttribute("aria-valuenow", String(safeCurrent));
	});
}
