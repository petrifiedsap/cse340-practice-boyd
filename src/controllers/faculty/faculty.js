import { getFacultyById, getSortedFaculty } from '../../models/faculty/faculty.js';

const facultyListPage = (req, res) => {
    const sortBy = req.query.sort || 'name';
    const faculty = getSortedFaculty(sortBy);

    res.render('faculty/list', {
        title: 'Faculty',
        faculty,
        currentSort: sortBy
    });
};

const facultyDetailPage = (req, res, next) => {
    const teacherId = req.params.facultyId;
    const teacher = getFacultyById(teacherId);

    if (!teacher) {
        const err = new Error(`Faculty Member ${teacherId} not found`);
        err.status = 404;
        return next(err);
    }

    res.render('faculty/detail', {
        title: teacher.name,
        teacher
    });
};

export { facultyListPage, facultyDetailPage };