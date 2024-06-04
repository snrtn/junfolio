export interface Post {
	id: number;
	title: string;
	tags: string[];
	imgSrc: string;
	content: string;
}

export const posts: Post[] = [
	{
		id: 1,
		title: 'Développement',
		tags: ['JavaScript'],
		imgSrc: 'https://source.unsplash.com/1600x900/?javascript,code',
		content:
			'Article sur le développement JavaScript. Cet article couvre les concepts de base de JavaScript et les dernières tendances.',
	},
	{
		id: 2,
		title: 'Étude',
		tags: ['Éducation'],
		imgSrc: 'https://source.unsplash.com/1600x900/?education,study',
		content:
			"Article sur l'éducation. Cet article discute des méthodes d'apprentissage efficaces et de l'importance de l'éducation.",
	},
	{
		id: 3,
		title: 'Création de site',
		tags: ['Développement Web'],
		imgSrc: 'https://source.unsplash.com/1600x900/?web,development',
		content:
			'Article sur le développement web. Cet article explique le processus de création de sites web et les technologies clés.',
	},
	{
		id: 4,
		title: 'Divers',
		tags: ['Divers'],
		imgSrc: 'https://source.unsplash.com/1600x900/?miscellaneous',
		content: 'Article sur divers sujets. Cet article aborde divers sujets intéressants.',
	},
	{
		id: 5,
		title: 'Programmation',
		tags: ['Codage'],
		imgSrc: 'https://source.unsplash.com/1600x900/?programming,code',
		content: 'Article sur la programmation. Cet article discute de divers langages et techniques de programmation.',
	},
	{
		id: 6,
		title: 'Conception',
		tags: ['Design Graphique'],
		imgSrc: 'https://source.unsplash.com/1600x900/?graphic,design',
		content:
			'Article sur le design graphique. Cet article couvre les principes de conception et les dernières tendances en design.',
	},
	{
		id: 7,
		title: 'Base de données',
		tags: ['SQL'],
		imgSrc: 'https://source.unsplash.com/1600x900/?database,sql',
		content:
			'Article sur les bases de données et SQL. Cet article explique les concepts de base de SQL et la gestion des bases de données.',
	},
	{
		id: 8,
		title: 'Cloud',
		tags: ['AWS'],
		imgSrc: 'https://source.unsplash.com/1600x900/?cloud,aws',
		content:
			'Article sur le cloud computing et AWS. Cet article couvre les principaux services AWS et les avantages du cloud computing.',
	},
];
