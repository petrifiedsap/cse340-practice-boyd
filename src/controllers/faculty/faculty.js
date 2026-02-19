import { getFacultyBySlug, getSortedFaculty, getFacultyByDepartment } from '../../models/faculty/faculty.js';

const facultyListPage = async (req, res) => {
    const validSortOptions = ['name', 'department', 'title'];
    const sortBy = validSortOptions.includes(req.query.sort) ? req.query.sort : 'name';
    const facultyList = await getSortedFaculty(sortBy);
console.log(facultyList);
    res.render('faculty/list', {
        title: 'Faculty',
        faculty: facultyList,
        currentSort: sortBy
    });
};

const facultyDetailPage = async (req, res, next) => {
    const facultySlug = req.params.facultySlug;
    const facultyMember = await getFacultyBySlug(facultySlug);
    console.log(facultyMember);
    if (Object.keys(facultyMember).length === 0) {
        const err = new Error(`Faculty Member ${facultySlug} not found`);
        err.status = 404;
        return next(err);
    }

    res.render('faculty/detail', {
        title: facultyMember.name,
        faculty: facultyMember
    });
};

export { facultyListPage, facultyDetailPage };