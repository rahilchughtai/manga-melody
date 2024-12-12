import { GenreItem } from './filter.model';


export interface MangaImage {
	jpg: MangaImageCollection
	webp?: MangaImageCollection
}

export interface MangaImageCollection {
	image_url: string
	small_image_url?: string
	medium_image_url?: string
	large_image_url?: string
	maximum_image_url?: string
}

export interface JikanResource {
	mal_id: number
	type: string
	name: string
	url: string
}

export interface JikanNamedResource {
	name: string
	url: string
}

export interface JikanResourceTitle {
	type: string
	title: string
}

export interface JikanResourcePeriod {
	from: string
	to: string
	prop: {
		from: { day: number; month: number; year: number }
		to: { day: number; month: number; year: number }
		string: string
	}
}

export interface JikanResourceRelation {
	relation: string
	entry: JikanResource[]
}


export interface MangaData {
	mal_id: number
	url: string
	images: MangaImage
	approved: boolean
	titles: JikanResourceTitle[]
	title: string
	title_english?: string
	title_japanese: string
	title_synonyms?: string[]
	type: MangaType
	chapters: number
	volumes: number
	status: MangaStatus
	publishing: boolean
	published: JikanResourcePeriod
	score: number
	scored_by: number
	rank: number
	popularity: number
	members: number
	favorites: number
	synopsis: string
	background: string
	authors: JikanResource[]
	serializations: JikanResource[]
	genres: JikanResource[]
	explicit_genres: JikanResource[]
	themes: JikanResource[]
	demographics: JikanResource[]
	relations?: JikanResourceRelation[]
	external?: JikanNamedResource[]
}

export type MangaType =
	| 'Manga'
	| 'Novel'
	| 'Lightnovel'
	| 'Oneshot'
	| 'Doujin'
	| 'Manhwa'
	| 'Manhua'
export type MangaStatus =
	| 'Publishing'
	| 'Complete'
	| 'On Hiatus'
	| 'Discontinued'
	| 'Upcoming'
