export const ROUTES = {
    CABINET: "/my",
    METHODIC_CONSTRUCTOR: id => `/form/methodic/${id}`,
    RESEARCH_CONSTRUCTOR: id => `/form/research/${id}`,
    RESEARCH: slug => `/research/${slug}`,
    METHODIC: id => `/methodic/${id}`,
    RESULTS: id => `/research/${id}/results`,
    MAIN: "/",
    PUBLISHED: slug => `/form/research/published/${slug}`,
    RESEARCH_RESPONDENT: slug => `/research/${slug}`
}