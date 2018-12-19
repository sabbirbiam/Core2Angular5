using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Core2Angular5.Model;
using Microsoft.EntityFrameworkCore;

namespace Core2Angular5.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class StudentsController : Controller
    {
        private readonly DataContext context;
        public StudentsController(DataContext _context)
        {
            this.context = _context;
        }
        // Get:api/Students
        [HttpGet]
        public IEnumerable<Student> GetAll()
        {
            return this.context.Students.ToList();
        }

        //Get:api/Students/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudent([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var std = await this.context.Students.SingleOrDefaultAsync(d=>d.id==id);
            if (std == null)
            {
                return NotFound();
            }
            return Ok(std);
        }

        //post:api/Students
        [HttpPost]
        public async Task<IActionResult> PostStudent([FromBody]Student std)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            this.context.Students.Add(std);
            await this.context.SaveChangesAsync();
            return CreatedAtAction("GetStudent",new {id=std.id },std);

        }

        //Delete:api/Students/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent([FromRoute]int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var std = await this.context.Students.SingleOrDefaultAsync(d=>d.id==id);
            if (std == null)
            {
                return NotFound();
            }
            this.context.Students.Remove(std);
            await this.context.SaveChangesAsync();
            return Ok(std);

        }

        //update:api/Students/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent([FromRoute]int id,[FromBody]Student std)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            std.id = id;
            this.context.Entry<Student>(std).State = EntityState.Modified;
            await this.context.SaveChangesAsync();
            return Ok(std);

        }


    }
}