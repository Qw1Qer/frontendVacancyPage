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

            const state = getState() as { vacancy: typeof initialState };
            const { city, searchValue, skillsList } = state.vacancy;
            const searchText = skillsList.join(' ');


            const params = new URLSearchParams({
                industry: '7',
                professional_role: '96',
                page: apiPage.toString(),
                per_page: '10'
            });


            if(city) {
                params.append('area', city);
            }

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

            const totalAvailable = Math.min(data.found, 2000);
            const totalPages = Math.ceil(totalAvailable / 10);

            return {
                items: data.items || [],
                page: page,
                totalPages: totalPages,
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
    skillsList: string[];
    searchValue: string;
    skillPointValue: string;
    searchMessage: string;
    aboutMe: boolean;
    currentPage: number;
    totalPages: number;
    cities: string[];
    city: string;

} = {
    vacancies: [],
    loading: true,
    error: null,
    skillsList: ['JavaScript','React','Redux'],
    searchValue: '',
    skillPointValue: '',
    searchMessage: '',
    aboutMe: false,
    currentPage: 1,
    totalPages: 0,
    cities: ['Все города','Москва','Санкт-Петербург'],
    city: '',

};

const VacancySlice = createSlice({
    name: "VacancySlice",
    initialState,
    reducers: {

        resetPage: (state) => {
            state.currentPage = 1
        },

        changePage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },

        addSkill: (state, action: PayloadAction<string>) => {

            const filterCardsLowerCase = state.skillsList.map(card => card.toLowerCase())

            if(!filterCardsLowerCase.includes(action.payload.toLowerCase()) ) {
                state.skillsList.push(action.payload);
            }else{
                alert('Данный навык уже добавлен!')
            }

            state.skillPointValue = '';
        },

        deleteSkill: (state, action: PayloadAction<string>) => {
            state.skillsList = state.skillsList.filter(card => card !== action.payload);
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
                state.totalPages = action.payload.totalPages
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
    setSkillValue,
    resetPage
} = VacancySlice.actions;

export default VacancySlice.reducer;