import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}:any) => {
    return (
        <div>
            <MyInput
                value={filter.query}
                onChange={(e: any) => setFilter({...filter, query: e.target.value})}
                placeholder="Поиск"
            />
            <MySelect
                value={filter.post}
                onChange={(selectedSort:any) => setFilter({...filter, sort: selectedSort})}
                defaultValue="сортировка"
                options={[
                    {value: 'title', name: "По названию"},
                    {value: 'body', name: "По описанию"}
                ]}
            />
        </div>
    );
};

export default PostFilter;