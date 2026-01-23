import {createSlice, createAsyncThunk, type PayloadAction} from "@reduxjs/toolkit";



interface vacancy {
    id: string;
    name: string;
    salary: {
        from: number;
        to: number;
        currency: string;
        gross: boolean;
    };
    employer: {
        name: string;
    };
    area: {
        name: string;
    };
    experience: {
        id: string;
        name: string;
    };
    work_format: [
        {
            id: string;
            name: string;
        }
    ];
    snippet: {
        requirement: string;
    };
    alternate_url: string;
}

export const fetchVacancy = createAsyncThunk(
    'vacancy/fetchVacancy',
    async (page: number, { rejectWithValue, getState }) => {
        try {
            const apiPage = page - 1;

            // Получаем текущее состояние
            const state = getState() as { vacancy: typeof initialState };
            const { city, searchValue, filterCards } = state.vacancy;
            const searchText = filterCards.join(' ');


            // Формируем URL
            const params = new URLSearchParams({
                industry: '7',
                professional_role: '96',
                page: apiPage.toString(),
                per_page: '10'
            });


            // Добавляем город если есть
            if(city) {
                params.append('area', city);
            }


            // Добавляем поиск если есть
            if (searchValue?.trim() || searchText?.trim()) {
                if (searchText?.trim()) {
                    const combinedText = `${searchValue.trim()} ${searchText}`.trim();
                    params.append('search_field', 'description');
                    params.append('text', combinedText);
                }else{
                    params.append('text', searchValue.trim());
                }

            }



            const response = await fetch(
                `https://api.hh.ru/vacancies?${params.toString()}`
            );
            console.log(response);

            if (!response.ok) {
                throw new Error('Ошибка загрузки');
            }

            const data = await response.json();

            // Рассчитываем количество страниц
            const totalAvailable = Math.min(data.found, 2000);
            const totalPages = Math.ceil(totalAvailable / 100);

            return {
                items: data.items || [],
                page: page,
                pages: totalPages,
                found: data.found
            };
        } catch (error: any) {
            return rejectWithValue(error.message);

        }
    }
);



const initialState: {
    vacancies: vacancy[];
    loading: boolean;
    error: string | null;
    filterCards: string[];
    searchValue: string;
    skillPointValue: string;
    searchMessage: string;
    aboutMe: boolean;
    currentPage: number;
    totalPages: number;
    cities: string[];
    city: string;
    totalFound: number;
} = {
    vacancies: [],
    loading: true,
    error: null,
    filterCards: ['JavaScript','React','Redux'],
    searchValue: '',
    skillPointValue: '',
    searchMessage: '',
    aboutMe: false,
    currentPage: 1,
    cities: ['Все города','Москва','Санкт-Петербург'],
    city: '',
    totalPages: 10,
    totalFound: 0
};

const VacancySlice = createSlice({
    name: "VacancySlice",
    initialState,
    reducers: {

        changePage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },

        addSkill: (state, action: PayloadAction<string>) => {

            const filterCardsLowerCase = state.filterCards.map(card => card.toLowerCase())

            if(!filterCardsLowerCase.includes(action.payload.toLowerCase()) ) {
                state.filterCards.push(action.payload);
            }else{
                alert('Такой навык уже существует')
            }

            state.skillPointValue = '';
        },

        deleteSkill: (state, action: PayloadAction<string>) => {
            state.filterCards = state.filterCards.filter(card => card !== action.payload);
        },

        aboutMeChanged: (state, action: PayloadAction<boolean>) => {
            state.aboutMe = action.payload;
        },

        searchCityValue: (state, action: PayloadAction<string>) => {
            if (action.payload === 'Москва') {
                state.city = '1'
            }
            if (action.payload === 'Санкт-Петербург') {
                state.city = '2'
            }
            if(action.payload === 'Все города') {
                state.city = ''
            }
                state.currentPage = 1;

        },

        setupSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload.trim();
        },
        setSkillValue: (state, action: PayloadAction<string>) => {
            state.skillPointValue = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVacancy.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVacancy.fulfilled, (state, action) => {
                state.loading = false;
                state.vacancies = action.payload.items;
                state.currentPage = action.payload.page;
                state.totalPages = action.payload.pages;
                state.totalFound = action.payload.found;
            })

            .addCase(fetchVacancy.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Ошибка загрузки';
            });
    }
});

export const {
    setupSearchValue,
    searchCityValue,
    aboutMeChanged,
    deleteSkill,
    addSkill,
    changePage,
    setSkillValue
} = VacancySlice.actions;

export default VacancySlice.reducer;